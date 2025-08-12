"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 h-16 shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2 py-0">
      <div className="navbar-start w-auto lg:w-1/2">
        <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-24 h-24">
            <Image alt="DAO logo" className="cursor-pointer object-contain" fill src="/logo.png" />
          </div>
          <div className="flex flex-col gap-0">
            <span className="font-bold leading-tight text-lg">BuidlGuidl DAO LLC</span>
          </div>
        </Link>
      </div>
      <div className="navbar-end grow mr-4">{/* Wallet connection removed */}</div>
    </div>
  );
};
