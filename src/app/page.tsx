"use client";
import TokenSelector from "@/components/token-selector";
import { useState } from "react";
import { DuneProvider } from "@/provider";

export default function Home() {
  const [wallet, setWallet] = useState<string>("0x8840BB0D5990161889388Ab0979EF2103cF0dAdF");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Enter your wallet address"
        />
        <DuneProvider duneApiKey={process.env.DUNE_API_KEY ?? ''} >
          <TokenSelector wallet={wallet} />
        </DuneProvider>
      </main>
    </div>
  );
}
