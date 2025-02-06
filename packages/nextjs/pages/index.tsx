import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const owners: Array<string> = [
    "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    "0x630ddBE2a248e6F483FD021C13617421b476aE92",
    "0x11E91FB4793047a68dFff29158387229eA313ffE",
    "0x466bfA89bC742c840bc4660890D679d96D65613c",
    "0xB4F53bd85c00EF22946d24Ae26BC38Ac64F5E7B1",
    "0x699bFaC97c962db31238B429cEaF6734C492d61C",
    "0x5f97Cf9DD2cb7b53C47f6b1c26Ab4Bd143325d45",
    "0xf7e89E45502890381F9242403eA8661fad89Ca79",
  ];

  function Information() {
    return (
      <div className="w-2/5">
        <div className="bg-secondary mt-16 text-center p-8 rounded-lg">
          <p className="text-xl">
            <b>Constitution & Governance</b>
          </p>

          <p>
            BuidlGuidl DAO (LLC) exists to fund developers building intentional tutorials, components, and projects to
            improve 🏗 scaffold-eth and the greater Ethereum ecosystem.
          </p>

          <p>The BuidlGuidl DAO is member managed, utilizing a Safe smart contract at address:</p>

          <Link href="https://etherscan.io/address/0xeF899e80aA814ab8D8e232f9Ed6403A633C727ec" target="_blank">
            <button className="btn btn-primary">0xeF899e80aA814ab8D8e232f9Ed6403A633C727ec</button>
          </Link>

          <p>
            Members vote to send funds to 🏰 BuidlGuidl developers via streams and scholarships. Members can also vote
            to grant funds to external developers and educators who are enriching the ecosystem. All voting will take
            place in the Safe.
          </p>

          <p>
            Proposals to change the Constitution, Governance, or update the DAO in any way may only be introduced by
            current members. There are no fees associated with being a member, and any members who leave are not
            entitled to any funding in the smart contract.
          </p>

          <p>A 4 out of 8 vote is required to add or remove members or pass an active proposal.</p>

          <p>DAO members all have equal voting rights.</p>

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
              <Link href="https://etherscan.io/address/0xeF899e80aA814ab8D8e232f9Ed6403A633C727ec" target="_blank">
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
        <title>BuidlGuidl DAO LLC</title>
        <meta name="BuidlGidl DAO LLC" content="BuidlGuidl DAO LLC Constitution & Governance" />
        <script defer data-domain="dao.buidlguidl.com" src="https://plausible.io/js/script.js"></script>
      </Head>
      <Information />
      <Members />
    </div>
  );
};

export default Home;
