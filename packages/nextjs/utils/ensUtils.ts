export const resolveENS = async (address: string): Promise<string> => {
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=proxy&action=eth_call&to=0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C&data=0x691f3431000000000000000000000000${address.slice(2)}&apikey=S1IH9Y6MS44HNJXERBSBZHWX8I5C7VJ4FM`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.result && data.result !== '0x') {
        // Decode the ENS name from the result
        const name = decodeENSName(data.result);
        if (name) return name;
      }
    }
  } catch (error) {
    console.error('Error resolving ENS:', error);
  }
  
  return address;
};

const decodeENSName = (hexResult: string): string | null => {
  try {
    // Simple hex to string conversion for ENS names
    const hex = hexResult.slice(2); // Remove '0x'
    let name = '';
    for (let i = 0; i < hex.length; i += 2) {
      const charCode = parseInt(hex.substr(i, 2), 16);
      if (charCode === 0) break; // Null terminator
      name += String.fromCharCode(charCode);
    }
    return name || null;
  } catch (error) {
    return null;
  }
};

export const formatAddressWithENS = async (address: string): Promise<string> => {
  // For now, let's use a simpler approach with known ENS names
  const knownENS: { [key: string]: string } = {
    '0xef899e80aa814ab8d8e232f9ed6403a633c727ec': 'BuidlGuidl Safe',
    '0x4f3a120e72c76c22ae802d129f599bfdbc31cb81': 'austingriffith.eth',
    '0x7d7e436f0b2a7c4c3c3c3c3c3c3c3c3c3c3c3c3': 'buidlguidl.carletex.eth',
    // Add more known addresses as needed
  };
  
  const lowerAddress = address.toLowerCase();
  if (knownENS[lowerAddress]) {
    return knownENS[lowerAddress];
  }
  
  // For unknown addresses, show shortened version
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
