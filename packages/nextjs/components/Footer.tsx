"use client";

import Link from "next/link";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {/* Local network features removed */}
          </div>
          <SwitchTheme className="pointer-events-auto" />
        </div>
      </div>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <a href="https://github.com/scaffold-eth/se-2" target="_blank" rel="noreferrer" className="link">
                Fork me
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <Link href="/debug" passHref className="link">
                Debug Contracts
              </Link>
            </div>
            <span>·</span>
            <div className="text-center">
              <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="link">
                Support
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a href="https://speedrunethereum.com" target="_blank" rel="noreferrer" className="link">
                Speedrun
              </a>
            </div>
          </div>
        </ul>
      </div>
      <div className="w-full text-center">
        <a
          className="flex justify-center items-center gap-2"
          href="https://buidlguidl.com"
          target="_blank"
          rel="noreferrer"
        >
          <BuidlGuidlLogo className="w-3 h-5" />
          <span className="text-xs">Built with 🏗 BuidlGuidl</span>
        </a>
      </div>
    </div>
  );
};
