import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const owners: Array<string> = [
    "0x2dDC12E691F44f12A4BF5650317321fd996fB2F2",
    "0x2D143b3Ae28Fa31E7c821D138c58c32A30aA36Ae",
    "0x60583563D5879C2E59973E5718c7DE2147971807",
    "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    "0x60Ca282757BA67f3aDbF21F3ba2eBe4Ab3eb01fc",
    "0xf7e89E45502890381F9242403eA8661fad89Ca79",
    "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    "0x38F84e92B468a1885e73CedC9A4d5632DE07EABB",
    "0x2DdA8dc2f67f1eB94b250CaEFAc9De16f70c5A51",
    "0x775aF9b7c214Fe8792aB5f5da61a8708591d517E",
  ];

  function Information() {
    return (
      <div className="w-2/5">
        <div className="bg-secondary mt-16 text-center p-8 rounded-lg">
          <p className="text-xl">
            <b>Constitution & Governance</b>
          </p>

          <p>
            BuidlGuidl DAO (LLC) exists to fund developers building generic tutorials, components, and prototypes
            improve the 🏗 scaffold-eth and greater Ethereum ecosystem.
          </p>

          <p>The BuidlGuidl DAO is member managed, utilizing a Safe smart contract at address:</p>

          <Link href="https://etherscan.io/address/0x0eb2AB241210900Aeac2fbA054dD605355fe2490" target="_blank">
            <button className="btn btn-primary">0x0eb2AB241210900Aeac2fbA054dD605355fe2490</button>
          </Link>

          <p>
            Members vote to send funds to 🏰 BuidlGuidl developers via streams and scholarships. Members can also to
            grant funds to external developers and educators who are enriching the ecosystem. All voting allotment
            allotment will take place in the Safe.
          </p>

          <p>
            Proposals to change the Constitution, Governance, or update the DAO in any way may only be introduced
            current members. There are no fees associated with being a member, and any members who leave the entitled to
            entitled to any funding in the smart contract.
          </p>

          <p>A 4 out of 10 vote is required to add or remove members or pass an active proposal.</p>

          <p>DAO members all have equal voting rights.</p>

          <p>
            The DAO will do its best to keep developers&apos; ETH streams on{" "}
            <a href="https://buidlguidl.com">🏰 BuidlGuidl.com</a> full and flowing.
          </p>

          <p>
            <b>Keep 🛠 Buidling</b>
          </p>
        </div>
      </div>
    );
  }

  function Members() {
    return (
      <div className="w-2/5">
        <div className="bg-secondary my-16 text-center rounded-lg">
          <div>
            <div className="py-12 font-bold text-2xl">
              <Link href="https://etherscan.io/address/0x0eb2AB241210900Aeac2fbA054dD605355fe2490" target="_blank">
                <button className="btn btn-primary">dao.buidlguidl.eth</button>
              </Link>
            </div>
            <div className="font-bold text-xl"> Members: </div>
            <div className="text-left ml-10 mr-10 p-8">
              <ul>
                {owners.map(item => (
                  <div key={item} className="p-2 m-2 border-2 border-primary rounded-md">
                    <Address address={item} />
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary flex flex-col items-center">
      <Head>
        <title>BuidlGidl DAO LLC</title>
        <meta name="BuidlGidl DAO LLC" content="BuidlGuidl DAO LLC Constitution & Governance" />
      </Head>
      <Information />
      <Members />
    </div>
  );
};

export default Home;
