/* eslint-disable @next/next/no-img-element */
import { ChainIds, CHAINS, Chains } from "@/constants/chains";
import { getTokenLogoURI } from "@/lib/utils/getTokenLogoURI";
import { Token } from "@/types";
import React from "react";

const ChainTokenLogo = ({ token }: { token: Token }) => {
  return (
    <div className="relative dark:bg-neutral-600 bg-neutral-200 flex items-center justify-center rounded-3xl p-0.5">
      <img
        src={getTokenLogoURI(
          token.address as `0x${string}`,
          token.chain as Chains
        )}
        alt=""
        width={20}
        height={20}
        className="inline-block h-5 w-5 rounded-full"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = "/images/chains/unknown.png";
        }}
      />
      <img
        src={`/images/chains/${token.chain}.png`}
        alt=""
        width={12}
        height={12}
        className="absolute -bottom-0.5 -right-0.5 inline-block h-3 w-3 rounded-full"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = "/images/chains/unknown.png";
        }}
      />
    </div>
  );
};

const ChainLogo = ({ chainId }: { chainId: ChainIds }) => {
  return (
    <div className="dark:bg-neutral-600 bg-neutral-200 rounded-3xl p-0.5">
      <img
        src={getChainImagePath(CHAINS[chainId])}
        alt=""
        width={20}
        height={20}
      />
    </div>
  );
};

function getChainImagePath(chainName: Chains) {
  const img = chainName === "binance" ? "bnb" : chainName;
  return `/images/chains/${img}.png`;
}

export { ChainTokenLogo, ChainLogo };
