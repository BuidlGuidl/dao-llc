/**
 * Hook to get contract event history.
 * Note: Wallet functionality has been removed, so this returns a placeholder.
 */
export const useScaffoldEventHistory = (_config: any) => {
  return {
    data: [],
    isError: false,
    isLoading: false,
  };
};
