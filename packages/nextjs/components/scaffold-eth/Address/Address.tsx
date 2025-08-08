"use client";

import { AddressCopyIcon } from "./AddressCopyIcon";
import { AddressLinkWrapper } from "./AddressLinkWrapper";
import { Address as AddressType, getAddress, isAddress } from "viem";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

const textSizeMap = {
  "3xs": "text-[10px]",
  "2xs": "text-[11px]",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
} as const;

const blockieSizeMap = {
  "3xs": 4,
  "2xs": 5,
  xs: 6,
  sm: 7,
  base: 8,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
  "4xl": 17,
  "5xl": 19,
  "6xl": 21,
  "7xl": 23,
} as const;

const copyIconSizeMap = {
  "3xs": "h-2.5 w-2.5",
  "2xs": "h-3 w-3",
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  base: "h-[18px] w-[18px]",
  lg: "h-5 w-5",
  xl: "h-[22px] w-[22px]",
  "2xl": "h-6 w-6",
  "3xl": "h-[26px] w-[26px]",
  "4xl": "h-7 w-7",
} as const;

type AddressProps = {
  address?: AddressType;
  disableAddressLink?: boolean;
  format?: "short" | "long";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

export const Address = ({ address, disableAddressLink, format, size = "base" }: AddressProps) => {
  const checkSumAddress = address ? getAddress(address) : undefined;
  const { targetNetwork } = useTargetNetwork();

  const shortAddress = checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4);
  const displayAddress = format === "long" ? checkSumAddress : shortAddress;

  if (!checkSumAddress) {
    return (
      <div className="flex items-center">
        <div
          className="shrink-0 skeleton rounded-full"
          style={{
            width: (blockieSizeMap[size] * 24) / blockieSizeMap["base"],
            height: (blockieSizeMap[size] * 24) / blockieSizeMap["base"],
          }}
        ></div>
        <div className="flex flex-col space-y-1">
          <div className={`ml-1.5 skeleton rounded-lg ${textSizeMap[size]}`}>
            <span className="invisible">0x1234...56789</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAddress(checkSumAddress)) {
    return <span className="text-error">Wrong address</span>;
  }

  const blockExplorerAddressLink = getBlockExplorerAddressLink(targetNetwork, checkSumAddress);

  return (
    <div className="flex items-center shrink-0">
      <div className="shrink-0">
        <BlockieAvatar address={checkSumAddress} size={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]} />
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <span className={`ml-1.5 ${textSizeMap[size]} font-normal`}>
            <AddressLinkWrapper
              disableAddressLink={disableAddressLink}
              blockExplorerAddressLink={blockExplorerAddressLink}
            >
              {displayAddress}
            </AddressLinkWrapper>
          </span>
          <AddressCopyIcon className={`ml-1 ${copyIconSizeMap[size]} cursor-pointer`} address={checkSumAddress} />
        </div>
      </div>
    </div>
  );
};
