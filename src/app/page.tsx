"use client";

import ChainSelector from "@/components/chain-token-selector/chain-selector";
import TokenSelector from "@/components/chain-token-selector/token-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { ChainIds } from "@/constants/chains";
import { DuneProvider } from "@/context/dune-provider";
import { env } from "@/env";
import { Token } from "@/types";
import { getChains } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ADDRESS = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

export default function Home() {
  const [wallet, setWallet] = useState<string>(ADDRESS);
  const [token, setToken] = useState<Token>();
  const [chain, setChain] = useState<ChainIds | undefined>();

  const allowedChains = getChains();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ThemeToggle />

        <Input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Enter your wallet address"
        />

        <DuneProvider duneApiKey={env.NEXT_PUBLIC_DUNE_API_KEY ?? ""}>
          <div className="flex flex-col gap-4">
            {/* Chain Selector */}
            <div className="flex items-center gap-2">
              <ChainSelector
                allowedChains={allowedChains}
                selectedChain={chain}
                setSelectedChain={setChain}
              />
              <Button onClick={() => setChain(undefined)} disabled={!chain}>
                clear
              </Button>
            </div>

            {/* Token Selector */}
            <TokenSelector
              token={token}
              onTokenChange={setToken}
              wallet={wallet}
              chains={chain ? [chain] : undefined}
              excludeSpamTokens
            />
          </div>
        </DuneProvider>
      </main>
    </div>
  );
}
