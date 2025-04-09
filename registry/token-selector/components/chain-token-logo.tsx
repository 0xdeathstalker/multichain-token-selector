/* eslint-disable @next/next/no-img-element */
import { ChainIds, Chains } from "@/constants/chains";
import {
  getChainImagePath,
  getTokenLogoURI,
} from "@/registry/token-selector/lib/logo";
import { Token } from "../lib/types/api";

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
          (e.target as HTMLImageElement).src =
            "https://routernitro.com/images/unknown.png";
        }}
      />
      <img
        src={getChainImagePath(token.chain_id)}
        alt=""
        width={12}
        height={12}
        className="absolute -bottom-0.5 -right-0.5 inline-block h-3 w-3 rounded-full"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src =
            "https://routernitro.com/images/unknown.png";
        }}
      />
    </div>
  );
};

const ChainLogo = ({ chainId }: { chainId: ChainIds }) => {
  return (
    <div className="dark:bg-neutral-600 bg-neutral-200 rounded-3xl p-0.5">
      <img src={getChainImagePath(chainId)} alt="" width={20} height={20} />
    </div>
  );
};

export { ChainLogo, ChainTokenLogo };
