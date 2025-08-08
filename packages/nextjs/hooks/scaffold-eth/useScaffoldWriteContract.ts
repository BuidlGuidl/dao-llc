/**
 * Hook to write contract data.
 * Note: Wallet functionality has been removed, so this returns a placeholder.
 */
export const useScaffoldWriteContract = (config: any) => {
  return {
    data: null,
    isError: false,
    isLoading: false,
    writeContract: () => {},
    writeContractAsync: async () => null,
  };
};
