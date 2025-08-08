/**
 * Hook to read contract data.
 * Note: Wallet functionality has been removed, so this returns a placeholder.
 */
export const useScaffoldReadContract = (config: any) => {
  return {
    data: null,
    isError: false,
    isLoading: false,
    refetch: () => {},
  };
};
