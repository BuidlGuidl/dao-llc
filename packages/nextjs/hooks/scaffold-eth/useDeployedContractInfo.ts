/**
 * Hook to get deployed contract info.
 * Note: Wallet functionality has been removed, so this returns a placeholder.
 */
export const useDeployedContractInfo = (config: any) => {
  return {
    data: null,
    isLoading: false,
  };
};
