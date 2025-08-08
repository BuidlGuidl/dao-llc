export const formatEther = (wei: string): string => {
  const ether = parseFloat(wei) / Math.pow(10, 18);
  return ether.toFixed(4);
};

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatExecutionDate = (timestamp: string): string => {
  try {
    if (!timestamp) return 'Unknown time';
    
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  } catch (error) {
    console.error('Error formatting execution date:', error);
    return 'Unknown time';
  }
};

export const getTransactionTitle = (transaction: any): string => {
  // Check if it's a Safe transaction
  if (transaction.safeTxHash) {
    if (transaction.isExecuted) {
      if (transaction.isSuccessful) {
        return '✅ Safe Transaction Executed';
      } else {
        return '❌ Safe Transaction Failed';
      }
    } else {
      return '⏳ Safe Transaction Pending';
    }
  }

  // Fallback to old logic
  const value = parseFloat(transaction.value);
  if (value === 0) {
    return '🔧 Contract Interaction';
  } else if (value > 0) {
    return '💰 Outgoing Transfer';
  } else {
    return '📥 Incoming Transfer';
  }
};

export const getTransactionDescription = (transaction: any): string => {
  // Check if it's a Safe transaction
  if (transaction.safeTxHash) {
    if (transaction.internalTransactions && transaction.internalTransactions.length > 0) {
      const internal = transaction.internalTransactions[0];
      if (internal.type === 'call') {
        return `Internal call to ${formatAddress(internal.to)}`;
      } else if (internal.type === 'create') {
        return 'Contract creation';
      } else {
        return `Internal transaction: ${internal.type}`;
      }
    }
    
    if (transaction.methodName) {
      return `Method: ${transaction.methodName}`;
    }
    
    // Fix: Use the length of confirmations array instead of the array itself
    const confirmationsCount = Array.isArray(transaction.confirmations) ? transaction.confirmations.length : 0;
    return `Safe transaction (${confirmationsCount}/${transaction.confirmationsRequired} confirmations)`;
  }

  // Fallback to old logic
  const value = parseFloat(transaction.value);
  if (value === 0) {
    return 'Smart contract execution';
  } else if (value > 0) {
    return `Transfer to ${formatAddress(transaction.to)}`;
  } else {
    return `Transfer from ${formatAddress(transaction.from)}`;
  }
};

export const getTransactionExecutor = (transaction: any): string => {
  try {
    if (transaction?.safeTxHash && transaction?.confirmationDetails && Array.isArray(transaction.confirmationDetails)) {
      // For Safe transactions, we need to look at the confirmation details
      // The executor is typically the last person to confirm before execution
      const confirmations = transaction.confirmationDetails;
      
      // If there are confirmations, get the last one (the executor)
      if (confirmations.length > 0) {
        const lastConfirmation = confirmations[confirmations.length - 1];
        if (lastConfirmation?.owner) {
          return resolveENSName(lastConfirmation.owner);
        }
      }
      
      // If no confirmations found, try to get from internal transactions
      if (transaction.internalTransactions && transaction.internalTransactions.length > 0) {
        const internal = transaction.internalTransactions[0];
        if (internal.from && internal.from !== transaction.from) {
          return resolveENSName(internal.from);
        }
      }
    }
  } catch (error) {
    console.error('Error getting transaction executor:', error);
  }
  
  // Fallback to transaction from address
  return resolveENSName(transaction?.from || 'Unknown');
};

const resolveENSName = (address: string): string => {
  // Known ENS names for common addresses (you can add more here)
  const knownENS: { [key: string]: string } = {
    '0xef899e80aa814ab8d8e232f9ed6403a633c727ec': 'BuidlGuidl Safe',
    '0x34aa3f359a9d614239015126635ce7732c18fdf3': 'austingriffith.eth',
    '0x630ddbe2a248e6f483fd021c13617421b476ae92': 'buidlguidl.carletex.eth',
    // Actual executor addresses from the debug output
    '0x11e91fb4793047a68dfff29158387229ea313ffe': 'BuidlGuidl.ZakGriffith.eth',
    '0x466bfa89bc742c840bc4660890d679d96d65613c': 'sign.spencerfaber.eth',
    '0xb4f53bd85c00ef22946d24ae26bc38ac64f5e7b1': 'pabl0cks.eth',
    '0x699bfac97c962db31238b429ceaf6734c492d61c': 'baluu.eth',
    '0x5f97cf9dd2cb7b53c47f6b1c26ab4bd143325d45': 'gnole.eth',
    '0xf7e89e45502890381f9242403ea8661fad89ca79': 'hunterchang.eth',

    // Add more known addresses as you discover them
  };
  
  const lowerAddress = address.toLowerCase();
  if (knownENS[lowerAddress]) {
    return knownENS[lowerAddress];
  }
  
  // For unknown addresses, show shortened version
  return formatAddress(address);
};

export const getTransactionAmount = (transaction: any): string => {
  // Check for internal transactions first (these contain the actual amounts)
  if (transaction.internalTransactions && transaction.internalTransactions.length > 0) {
    const internal = transaction.internalTransactions[0];
    if (internal.value && internal.value !== '0') {
      return formatEther(internal.value);
    }
  }
  
  // Fallback to main transaction value
  return formatEther(transaction.value);
};
