"use client";

import { ChainTokenLogo } from "@/components/chain-token-logo";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatNumber, formatTokenAmount, tokenKey } from "@/lib/utils";
import React from "react";
import { TokenListItemProps, TokenSelectionProps } from "./types";

const TokenSelection: React.FC<TokenSelectionProps> = ({
  isBalancesLoading,
  balances,
  selectedToken,
  setSelectedToken,
  setSelectedChain,
  setOpen,
}) => {
  return (
    <Command
      defaultValue={"-"}
      className="min-h-[340px] max-h-[45svh] bg-transparent border"
    >
      <CommandInput placeholder="Search token..." className="text-xs" />
      <CommandList>
        {!isBalancesLoading && (
          <CommandEmpty className="text-xs text-center py-3">
            No token found.
          </CommandEmpty>
        )}

        {isBalancesLoading ? (
          <div className="p-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <Skeleton className="h-6 min-w-6 rounded-full" />
                <div className="w-full flex items-center justify-between">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CommandGroup>
            {balances &&
              balances.map((token) => {
                const key = tokenKey(token);
                return (
                  <TokenListItem
                    key={key}
                    itemKey={key}
                    token={token}
                    selectedToken={selectedToken}
                    setSelectedToken={setSelectedToken}
                    setSelectedChain={setSelectedChain}
                    setOpen={setOpen}
                  />
                );
              })}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

const TokenListItem: React.FC<TokenListItemProps> = ({
  itemKey,
  selectedToken,
  setSelectedToken,
  setSelectedChain,
  token,
  setOpen,
}) => {
  const isSelected = selectedToken && tokenKey(selectedToken) === itemKey;
  return (
    <CommandItem
      value={itemKey}
      onSelect={() => {
        setSelectedToken(token);
        setSelectedChain(token.chain_id);
        setOpen(false);
      }}
      className={cn(
        "flex gap-2 cursor-pointer text-xs border",
        isSelected ? "border-border bg-secondary" : "border-transparent"
      )}
    >
      <ChainTokenLogo token={token} />
      {token.symbol}
      <div className="ml-auto flex items-center gap-1 font-mono">
        <span>
          {formatTokenAmount(BigInt(token.amount), token.decimals ?? 18)}
        </span>
        <span className="max-w-[5rem] inline-flex items-center">
          (<p className="truncate">${formatNumber(token.value_usd ?? "-")}</p>)
        </span>
      </div>
    </CommandItem>
  );
};

export default TokenSelection;
