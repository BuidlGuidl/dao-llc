"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const headerMenuLinks: HeaderMenuLink[] = [
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {headerMenuLinks?.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link href={href} passHref className={`!text-white hover:bg-transparent focus:bg-transparent uppercase`}>
              <span className={isActive ? "bg-secondary shadow-sm" : ""}>
                {icon}
                <span>{label}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 h-16 shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2 py-0">
      <div className="navbar-start w-auto lg:w-1/2">
        <details className="dropdown" ref={burgerMenuRef}>
          <summary className="ml-1 btn btn-ghost lg:hidden hover:bg-transparent">
            <Bars3Icon className="h-1/2" />
          </summary>
          <ul
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-sm bg-base-100 rounded-box w-52"
            onClick={() => {
              burgerMenuRef?.current?.removeAttribute("open");
            }}
          >
            <HeaderMenuLinks />
          </ul>
        </details>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-24 h-24">
            <Image alt="DAO logo" className="cursor-pointer object-contain" fill src="/logo.png" />
          </div>
          <div className="flex flex-col gap-0">
            <span className="font-bold leading-tight text-sm">BuidlGuidl DAO LLC</span>
            <span className="text-xs">🤠 Registered Wyoming DAO LLC 2021-001041159</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end grow mr-4">{/* Wallet connection removed */}</div>
    </div>
  );
};
