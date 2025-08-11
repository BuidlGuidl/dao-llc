/**
 * Hook to get contract instance.
 * Note: Wallet functionality has been removed, so this returns null.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useScaffoldContract = <TContractName extends string>(config: {
  contractName: string;
  walletClient?: any;
}) => {
  return null;
};
