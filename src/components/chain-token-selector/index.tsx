"use client";

import { ChainTokenLogo } from "@/components/chain-token-logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useEvmTokenBalances } from "@/lib/hooks/useTokenBalances";
import { getChains } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
import { ChainSelection, ChainSelectionDrawer } from "./chain-selection";
import TokenSelection from "./token-selection";
import { ChainAndTokenSelectorProps } from "./types";

const ChainAndTokenSelector: React.FC<ChainAndTokenSelectorProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const [open, setOpen] = useState<boolean>(false);
  const [chainDrawerOpen, setChainDrawerOpen] = useState<boolean>(false);

  const { data, isLoading: isBalancesLoading } = useEvmTokenBalances(
    props.wallet as `0x${string}`,
    { excludeSpamTokens: props.excludeSpamTokens, chainIds: props.chain }
  );
  const balances = data?.balances;

  const allowedChains = getChains();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-xs"
          >
            <div className="inline-flex items-center gap-2">
              {props.token?.address && <ChainTokenLogo token={props.token} />}
              {props.token ? props.token.symbol : "Select token..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl">
          <DialogTitle className="text-sm">Select a token</DialogTitle>

          <div className="flex items-center gap-5">
            <ChainSelection
              allowedChains={allowedChains}
              selectedChain={props.chain}
              setSelectedChain={props.setChain}
            />

            <Separator orientation="vertical" />

            <TokenSelection
              balances={balances}
              isBalancesLoading={isBalancesLoading}
              selectedToken={props.token}
              setSelectedToken={props.onTokenChange}
              setSelectedChain={props.setChain}
              setOpen={setOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-xs"
        >
          <div className="inline-flex items-center gap-2">
            {props.token?.address && <ChainTokenLogo token={props.token} />}
            {props.token ? props.token.symbol : "Select token..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle>Select a token</DrawerTitle>

            <ChainSelectionDrawer
              allowedChains={allowedChains}
              selectedChain={props.chain}
              setSelectedChain={props.setChain}
              chainDrawerOpen={chainDrawerOpen}
              setChainDrawerOpen={setChainDrawerOpen}
            />
          </div>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <TokenSelection
            balances={balances}
            isBalancesLoading={isBalancesLoading}
            selectedToken={props.token}
            setSelectedToken={props.onTokenChange}
            setSelectedChain={props.setChain}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChainAndTokenSelector;
