import { Address } from "viem";

type UseBalanceParameters = {
  address?: Address;
};

/**
 * Hook to watch balance of an ETH address.
 * Note: Wallet functionality has been removed, so this returns a placeholder.
 */
export const useWatchBalance = (useBalanceParameters: UseBalanceParameters) => {
  return {
    data: null,
    isError: false,
    isLoading: false,
  };
};
