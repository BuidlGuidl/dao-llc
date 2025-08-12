export const formatEther = (wei: string): string => {
  const ether = parseFloat(wei) / Math.pow(10, 18);
  return ether.toFixed(2);
};

export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatExecutionDate = (timestamp: string): string => {
  try {
    if (!timestamp) return "Unknown time";

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid date";

    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 48) {
      const timeStr = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `Yesterday at ${timeStr}`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  } catch (error) {
    console.error("Error formatting execution date:", error);
    return "Unknown time";
  }
};

export const getTransactionTitle = (transaction: any): string => {
  // Check if it's a Safe transaction
  if (transaction.safeTxHash) {
    if (transaction.isExecuted) {
      if (transaction.isSuccessful) {
        return "✅ Executed";
      } else {
        return "❌ Failed";
      }
    } else {
      return "⏳ Pending";
    }
  }

  // Fallback to old logic
  const value = parseFloat(transaction.value);
  if (value === 0) {
    return "🔧 Contract Interaction";
  } else if (value > 0) {
    return "💰 Outgoing Transfer";
  } else {
    return "📥 Incoming Transfer";
  }
};

export const getTransactionDescription = (transaction: any): string => {
  // Check if it's a Safe transaction
  if (transaction.safeTxHash) {
    // Check for specific contract interactions FIRST (before other logic)
    if (transaction.to) {
      const toAddress = transaction.to.toLowerCase();

      // ETH splitter contract
      if (toAddress === "0x92a66a3e5f8da48b17eb48825487a1698d1c5519") {
        return "Split ETH";
      }

      // DAI contract - check if this is filling ETH streams
      if (toAddress === "0x6b175474e89094c44da98b954eedeac495271d0f") {
        return "Fill ETH Streams";
      }
    }

    // Check if "swap" is mentioned anywhere in the origin data
    if (transaction.origin) {
      const originStr = JSON.stringify(transaction.origin).toLowerCase();
      if (originStr.includes("swap")) {
        return "Swap";
      }
    }

    if (transaction.internalTransactions && transaction.internalTransactions.length > 0) {
      const internal = transaction.internalTransactions[0];
      if (internal.type === "call") {
        return `Internal call to ${formatAddress(internal.to)}`;
      } else if (internal.type === "create") {
        return "Contract creation";
      } else {
        return `Internal transaction: ${internal.type}`;
      }
    }

    if (transaction.methodName) {
      return `Method: ${transaction.methodName}`;
    }

    // Check if this looks like an ETH distribution/splitter transaction
    const hasValue = transaction.value && parseFloat(transaction.value) > 0;
    const hasInternalTxs = transaction.internalTransactions && transaction.internalTransactions.length > 0;

    if (hasValue || hasInternalTxs) {
      // Check internal transactions for multiple recipients (splitter pattern)
      if (hasInternalTxs && transaction.internalTransactions.length > 1) {
        return "ETH distribution to multiple recipients";
      } else if (hasInternalTxs && transaction.internalTransactions.length === 1) {
        const internal = transaction.internalTransactions[0];
        if (parseFloat(internal.value) > 0) {
          return "ETH Transfer";
        }
      } else if (hasValue) {
        return "ETH Transfer";
      }
    }

    // Generic contract interaction for other addresses
    if (transaction.to && transaction.to.toLowerCase() !== transaction.from) {
      return "Contract interaction";
    }

    // Final fallback with confirmation count
    const confirmationsCount = Array.isArray(transaction.confirmations) ? transaction.confirmations.length : 0;
    return `Safe transaction (${confirmationsCount}/${transaction.confirmationsRequired} confirmations)`;
  }

  // Fallback to old logic
  const value = parseFloat(transaction.value);
  if (value === 0) {
    return "Smart contract execution";
  } else if (value > 0) {
    return `Transfer to ${formatAddress(transaction.to)}`;
  } else {
    return `Transfer from ${formatAddress(transaction.from)}`;
  }
};

export const getTransactionExecutor = (transaction: any): string | null => {
  try {
    // For Safe transactions, only use actualExecutor field set by the API
    if (transaction?.safeTxHash) {
      // Only use the actualExecutor field - don't fallback to confirmations
      if (transaction?.actualExecutor) {
        return resolveENSName(transaction.actualExecutor);
      }

      // If no actualExecutor, return null (hide "Proposed by" line)
      return null;
    }
  } catch (error) {
    console.error("Error getting transaction proposer:", error);
  }

  // Fallback to transaction from address (for non-Safe transactions)
  const fallbackName = resolveENSName(transaction?.from || "Unknown");
  if (fallbackName === "Unknown" || fallbackName === "N/A" || fallbackName.includes("...")) {
    return null;
  }
  return fallbackName;
};

const resolveENSName = (address: string): string => {
  // Known ENS names for common addresses (you can add more here)
  const knownENS: { [key: string]: string } = {
    "0xef899e80aa814ab8d8e232f9ed6403a633c727ec": "BuidlGuidl Safe",
    "0x34aa3f359a9d614239015126635ce7732c18fdf3": "austingriffith.eth",
    "0x630ddbe2a248e6f483fd021c13617421b476ae92": "buidlguidl.carletex.eth",
    // Actual executor addresses from the debug output
    "0x11e91fb4793047a68dfff29158387229ea313ffe": "buidlguidl.zakgriffith.eth",
    "0x466bfa89bc742c840bc4660890d679d96d65613c": "sign.spencerfaber.eth",
    "0xb4f53bd85c00ef22946d24ae26bc38ac64f5e7b1": "pabl0cks.eth",
    "0x699bfac97c962db31238b429ceaf6734c492d61c": "baluu.eth",
    "0x5f97cf9dd2cb7b53c47f6b1c26ab4bd143325d45": "gnole.eth",
    "0xf7e89e45502890381f9242403ea8661fad89ca79": "hunterchang.eth",

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
  // Check if this is a DAI transaction to ETH Streams
  if (transaction.to && transaction.to.toLowerCase() === "0x6b175474e89094c44da98b954eedeac495271d0f") {
    // For DAI transactions, we need to parse the transaction data to get the amount
    if (transaction.dataDecoded && transaction.dataDecoded.parameters) {
      // Look for common parameter names that might contain the DAI amount
      const valueParam = transaction.dataDecoded.parameters.find(
        (param: any) =>
          param.name === "value" ||
          param.name === "amount" ||
          param.name === "_value" ||
          param.name === "wad" ||
          param.name === "_amount" ||
          param.name === "tokens",
      );

      if (valueParam && valueParam.value) {
        // Convert from DAI wei (18 decimals) to DAI
        const daiAmount = parseFloat(valueParam.value) / Math.pow(10, 18);
        return Math.round(daiAmount).toLocaleString("en-US");
      }
    }

    // Fallback for DAI transactions without decoded data
    return "0";
  }

  // Check for internal transactions first (these contain the actual amounts)
  if (transaction.internalTransactions && transaction.internalTransactions.length > 0) {
    const internal = transaction.internalTransactions[0];
    if (internal.value && internal.value !== "0") {
      return formatEther(internal.value);
    }
  }

  // Fallback to main transaction value
  return formatEther(transaction.value);
};
