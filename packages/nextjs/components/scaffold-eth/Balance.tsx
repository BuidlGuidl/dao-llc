"use client";

import { Address } from "viem";

type BalanceProps = {
  address?: Address;
  className?: string;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 * Note: Wallet functionality has been removed, so this shows a placeholder.
 */
export const Balance = ({ address, className = "" }: BalanceProps) => {
  if (!address) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`btn btn-sm btn-ghost flex flex-col font-normal items-center ${className}`}>
      <div className="w-full flex items-center justify-center">
        <span className="text-muted">Balance not available</span>
      </div>
    </div>
  );
};
