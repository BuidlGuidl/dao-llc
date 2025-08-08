"use client";

import type { NextPage } from "next";

const BlockExplorer: NextPage = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Block Explorer</h1>
        <p className="text-neutral">
          Block explorer is not available in this version.
          <br />
          This feature requires local network functionality which has been removed.
        </p>
      </div>
    </div>
  );
};

export default BlockExplorer;
