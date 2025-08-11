/**
 * Hook to get deployed contract info.
 * Note: Wallet functionality has been removed, so this returns a placeholder.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useDeployedContractInfo = (config: any) => {
  return {
    data: {
      address: "0x0000000000000000000000000000000000000000" as const,
      abi: [],
    },
    isLoading: false,
  };
};
