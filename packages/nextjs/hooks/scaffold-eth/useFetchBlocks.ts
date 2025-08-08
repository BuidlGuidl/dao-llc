/**
 * Hook to fetch blocks.
 * Note: Wallet functionality has been removed, so this returns empty arrays.
 */
export const useFetchBlocks = () => {
  return {
    blocks: [] as any[],
    transactionReceipts: {} as Record<string, any>,
    currentPage: 1,
    totalBlocks: 0,
    setCurrentPage: () => {},
    error: null,
  };
};
