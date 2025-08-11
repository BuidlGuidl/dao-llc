"use client";

import Image from "next/image";
import { SwitchTheme } from "~~/components/SwitchTheme";

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

      <div className="w-full text-center">
        <a
          className="flex justify-center items-center gap-2"
          href="https://buidlguidl.com"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-sm">
            Built by{" "}
            <div className="inline-flex relative w-4 h-4 mx-1">
              <Image alt="Castle icon" className="cursor-pointer object-contain" fill src="/castle.svg" />
            </div>{" "}
            BuidlGuidl
          </span>
        </a>
      </div>
    </div>
  );
};
