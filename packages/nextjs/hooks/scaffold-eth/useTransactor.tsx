/**
 * Hook to create a transactor for sending transactions.
 * Note: Wallet functionality has been removed, so this returns a no-op function.
 */
export const useTransactor = (_walletClient?: any) => {
  return async (_params: any) => {
    console.warn("Transaction functionality has been removed");
    return null;
  };
};
