"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatNumber, tokenKey } from "@/lib/utils";
import { Token } from "@/types";
import { ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { ChainTokenLogo } from "./chain-token-logo";
import { useEvmTokenBalances } from "@/lib/hooks/useTokenBalances";
import { formatTokenAmount } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function TokenSelector({ wallet }: { wallet: string }) {
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token>();

  const { data, isLoading: isBalancesLoading } = useEvmTokenBalances(
    wallet as `0x${string}`,
    { excludeSpamTokens: true }
  );

  const balances = data?.balances;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-xs"
        >
          <div className="inline-flex items-center gap-2">
            {selectedToken?.address && <ChainTokenLogo token={selectedToken} />}
            {selectedToken ? selectedToken.symbol : "Select token..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw_-_4rem)] sm:w-64 p-0">
        <Command className="max-h-[45svh]">
          <CommandInput placeholder="Search token..." className="text-xs" />
          <CommandList>
            {!isBalancesLoading && (
              <CommandEmpty className="text-xs text-center py-3">
                No token found.
              </CommandEmpty>
            )}

            {isBalancesLoading ? (
              <div className="p-2">
                {Array.from({ length: 6 }).map((_, i) => (
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
                    // TODO: remove this check once networks.json is defined
                    if (token.value_usd) {
                      return (
                        <TokenListItem
                          key={key}
                          itemKey={key}
                          token={token}
                          selectedToken={selectedToken}
                          setSelectedToken={setSelectedToken}
                          setOpen={setOpen}
                        />
                      );
                    }
                  })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function TokenListItem({
  itemKey,
  selectedToken,
  setSelectedToken,
  token,
  setOpen,
}: {
  itemKey: string;
  selectedToken: Token | undefined;
  setSelectedToken: Dispatch<SetStateAction<Token | undefined>>;
  token: Token;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const isSelected = selectedToken && tokenKey(selectedToken) === itemKey;
  return (
    <CommandItem
      value={itemKey}
      onSelect={() => {
        setSelectedToken(token);
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
}
