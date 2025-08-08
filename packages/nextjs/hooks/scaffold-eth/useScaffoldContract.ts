import { Address } from "viem";

type UseScaffoldContractConfig = {
  contractName: string;
  walletClient?: any;
};

/**
 * Hook to get contract instance.
 * Note: Wallet functionality has been removed, so this returns null.
 */
export const useScaffoldContract = <TContractName extends string>({
  contractName,
}: UseScaffoldContractConfig) => {
  return null;
};
