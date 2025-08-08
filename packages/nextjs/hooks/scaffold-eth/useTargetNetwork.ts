import { useMemo } from "react";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";
import { NETWORKS_EXTRA_DATA } from "~~/utils/scaffold-eth";

/**
 * Returns the target network from scaffold.config.
 * Note: Wallet functionality has been removed, so this returns the first configured network.
 */
export function useTargetNetwork(): { targetNetwork: ChainWithAttributes } {
  const targetNetwork = useMemo(() => {
    const network = scaffoldConfig.targetNetworks[0];
    return { ...network, ...NETWORKS_EXTRA_DATA[network.id] };
  }, []);

  return { targetNetwork };
}
