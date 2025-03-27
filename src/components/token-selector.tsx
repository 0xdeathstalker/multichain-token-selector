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
import ChainTokenLogo from "./chain-token-logo";
import { useEvmTokenBalances } from "@/lib/hooks/useTokenBalances";
import { formatTokenAmount } from "@/lib/utils";
export default function TokenSelector({ wallet }: { wallet: string }) {
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token>();

  const { data, isLoading: isBalancesLoading } = useEvmTokenBalances(
    wallet as `0x${string}`,
    {
      excludeSpamTokens: true,
    }
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
        <Command className="max-h-[80svh]">
          <CommandInput placeholder="Search token..." className="text-xs" />
          <CommandList>
            <CommandEmpty className="text-xs text-center py-3">
              No token found.
            </CommandEmpty>

            <CommandGroup>
              {!isBalancesLoading &&
                balances &&
                balances.map((token, index) => {
                  const key = tokenKey(token);
                  // TODO: remove this check once networks.json is defined
                  if (token.value_usd) {
                    return (
                      <TokenListItem
                        key={`${token.address}-${token.symbol}-${index}`}
                        itemKey={`${token.address}-${token.symbol}-${token.chain_id}`}
                        token={token}
                        selectedToken={selectedToken}
                        setSelectedToken={setSelectedToken}
                      />
                    );
                  }
                })}
            </CommandGroup>
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
}: {
  itemKey: string;
  selectedToken: Token | undefined;
  setSelectedToken: Dispatch<SetStateAction<Token | undefined>>;
  token: Token;
}) {

  const isSelected = selectedToken && (tokenKey(selectedToken) === itemKey);
  return (
    <CommandItem
      value={itemKey}
      onSelect={() => {
        setSelectedToken(token);
      }}
      className={cn(
        "flex gap-2 cursor-pointer text-xs border",
        isSelected
          ? "border-border bg-secondary"
          : "border-transparent"
      )}
    >
      <ChainTokenLogo token={token} />
      {token.symbol}
      <div className="ml-auto space-x-1 font-geist-mono">
        <span>{formatTokenAmount(BigInt(token.amount), token.decimals ?? 18)}</span>
        <span>(${formatNumber(token.value_usd ?? "-")})</span>
      </div>
    </CommandItem>
  );
}
