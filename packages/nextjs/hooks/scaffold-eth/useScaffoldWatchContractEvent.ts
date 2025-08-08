/**
 * Hook to watch contract events.
 * Note: Wallet functionality has been removed, so this returns a placeholder.
 */
export const useScaffoldWatchContractEvent = (config: any) => {
  return {
    data: null,
    isError: false,
    isLoading: false,
  };
};
