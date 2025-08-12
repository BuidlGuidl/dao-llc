"use client";

// @refresh reset
// import { Balance } from "../Balance";
// import { AddressInfoDropdown } from "./AddressInfoDropdown";
// import { AddressQRCodeModal } from "./AddressQRCodeModal";
// import { RevealBurnerPKModal } from "./RevealBurnerPKModal";
// import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
// import { ConnectButton } from "@rainbow-me/rainbowkit"; // Removed RainbowKit dependency
// import { Address } from "viem";
// import { useNetworkColor } from "~~/hooks/scaffold-eth";
// import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
// import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  // const networkColor = useNetworkColor();
  // const { targetNetwork } = useTargetNetwork();

  // Wallet functionality removed - return disabled button
  return (
    <button className="btn btn-primary btn-sm" disabled type="button">
      Wallet Disabled
    </button>
  );
};
