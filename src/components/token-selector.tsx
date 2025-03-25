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
import { useState } from "react";

const ADDRESS = "0x8840BB0D5990161889388Ab0979EF2103cF0dAdF";

export default function TokenSelector() {
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token>();

  const { balances, isBalancesError, isBalancesLoading } = useTokenBalances({
    address: ADDRESS,
  });
  console.log("[balances_data] = ", {
    balances: balances,
    isBalancesError,
    isBalancesLoading,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedToken ? selectedToken.symbol : "Select token..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandList>
            <CommandEmpty>No token found.</CommandEmpty>

            <CommandGroup>
              {!isBalancesLoading &&
                balances &&
                Object.entries(balances).map(([key, token], index) => {
                  // TODO: remove this check once networks.json is defined
                  if (token.value_usd) {
                    return (
                      <CommandItem
                        key={`${key}-${index}`}
                        value={key}
                        onSelect={() => {
                          setSelectedToken(token);
                        }}
                        className="flex gap-2 cursor-pointer"
                      >
                        {/* TODO: token logo with chain logo should come here */}
                        {token.chain_id}
                        {token.symbol}
                        <span className="ml-auto">
                          {token.value_usd?.toFixed(2)}
                        </span>

                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedToken?.id === key
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
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
