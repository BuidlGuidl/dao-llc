import { useTargetNetwork } from "./useTargetNetwork";

/**
 * Hook to get the selected network.
 * Note: Wallet functionality has been removed, so this returns the target network.
 */
export const useSelectedNetwork = (chainId?: number) => {
  const { targetNetwork } = useTargetNetwork();
  return targetNetwork;
};
