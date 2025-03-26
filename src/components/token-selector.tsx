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
import useTokenBalances from "@/lib/hooks/useTokenBalances";
import { cn } from "@/lib/utils";
import { Token } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import ChainTokenLogo from "./chain-token-logo";

const ADDRESS = "0x8840BB0D5990161889388Ab0979EF2103cF0dAdF";

export default function TokenSelector() {
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token>();

  const { balances, isBalancesLoading } = useTokenBalances({
    address: ADDRESS,
  });

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
            <CommandEmpty className="text-xs">No token found.</CommandEmpty>

            <CommandGroup>
              {!isBalancesLoading &&
                balances &&
                Object.entries(balances).map(([key, token], index) => {
                  // TODO: remove this check once networks.json is defined
                  if (token.value_usd) {
                    return (
                      <TokenListItem
                        key={`${key}-${index}`}
                        itemKey={key}
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
  return (
    <CommandItem
      value={itemKey}
      onSelect={() => {
        setSelectedToken(token);
      }}
      className="flex gap-2 cursor-pointer text-xs"
    >
      <ChainTokenLogo token={token} />
      {token.symbol}
      <div className="ml-auto space-x-1 font-geist-mono">
        <span>{token.amount}</span>
        <span>(${token.value_usd?.toFixed(2)})</span>
      </div>

      <Check
        className={cn(
          "mr-2 h-4 w-4",
          selectedToken?.id === itemKey ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}
