"use client";

import type { NextPage } from "next";
import { ClockIcon, DocumentTextIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useSafeTransactions } from "~~/hooks/useSafeTransactions";
import {
  formatExecutionDate,
  getTransactionAmount,
  getTransactionDescription,
  getTransactionExecutor,
  getTransactionTitle,
} from "~~/utils/transactionUtils";

const Home: NextPage = () => {
  const { transactions, loading, error } = useSafeTransactions();

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        {/* Hero Section */}
        <div className="px-5 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Welcome Card */}
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold text-primary">BuidlGuidl DAO</h2>
              <p className="text-sm text-base-content/70 mt-2">Registered 🤠Wyoming DAO LLC 2021-001041159</p>
            </div>

            {/* Mission Card */}
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold mb-3">Our Mission</h3>
              <p className="text-sm">
                Fund developers building intentional tutorials, components, and projects to improve 🏗 scaffold-eth and
                the greater Ethereum ecosystem.
              </p>
            </div>

            {/* Stats Card */}
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold mb-3">DAO Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Members:</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Votes Required:</span>
                  <span className="font-bold">4/8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Status:</span>
                  <span className="font-bold text-success">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Governance Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <DocumentTextIcon className="h-8 w-8" />
              Constitution & Governance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Funds and Voting</h3>
                <div className="space-y-4">
                  <div>
                    <ul className="space-y-1 text-sm">
                      <li>• 4 out of 8 votes required for proposals</li>
                      <li>• All members have equal voting rights</li>
                      <li>• No fees associated with membership</li>
                      <li>• Members vote via Safe smart contract</li>
                      <li>• Past, present, and future members are not entitled to any funds in the smart contract.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Safe Contract</h3>
                <p className="text-sm mb-3">
                  All voting and fund distribution happens through our Safe smart contract:
                </p>
                <div className="text-center">
                  <a
                    href="https://etherscan.io/address/0xeF899e80aA814ab8D8e232f9Ed6403A633C727ec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    0xeF899e80aA814ab8D8e232f9Ed6403A633C727ec
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Members Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <UserGroupIcon className="h-8 w-8" />
              Current Members
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                "austingriffith.eth",
                "buidlguidl.carletex.eth",
                "buidlguidl.zakgriffith.eth",
                "sign.spencerfaber.eth",
                "pabl0cks.eth",
                "baluu.eth",
                "gnole.eth",
                "hunterchang.eth",
              ].map((member, index) => (
                <a
                  key={index}
                  href={`https://etherscan.io/address/${member}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-base-100 p-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-center">
                    <p className="font-semibold text-xs leading-tight text-base-content hover:text-primary transition-colors">
                      {member}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <ClockIcon className="h-8 w-8" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {loading && (
                <div className="bg-base-100 p-6 rounded-3xl shadow-lg text-center">
                  <p className="text-base-content/70">Loading transactions...</p>
                </div>
              )}

              {error && (
                <div className="bg-base-100 p-6 rounded-3xl shadow-lg text-center">
                  <p className="text-error">Error loading transactions: {error}</p>
                  <p className="text-sm text-base-content/70 mt-2">Please check your API key configuration</p>
                </div>
              )}

              {!loading && !error && transactions.length === 0 && (
                <div className="bg-base-100 p-6 rounded-3xl shadow-lg text-center">
                  <p className="text-base-content/70">No recent transactions found</p>
                </div>
              )}

              {!loading &&
                !error &&
                transactions.map(tx => (
                  <div key={tx.hash} className="bg-base-100 p-6 rounded-3xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{getTransactionTitle(tx)}</h3>
                        <p className="text-sm text-base-content/70">{getTransactionDescription(tx)}</p>
                        <p className="text-xs text-base-content/60 mt-1">Executed by {getTransactionExecutor(tx)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-success">{getTransactionAmount(tx)} ETH</p>
                        <p className="text-xs text-base-content/70">{formatExecutionDate(tx.timeStamp)}</p>
                      </div>
                    </div>
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs mt-2 inline-block"
                    >
                      View on Etherscan →
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
