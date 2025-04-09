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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerContent,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvmTokenBalances } from "@/registry/token-selector/hooks/useTokenBalances";
import { cn } from "@/lib/utils";
import {
  formatNumber,
  formatTokenAmount,
  tokenKey,
} from "@/registry/token-selector/lib/format";
import { ChainIds } from "@/constants/chains";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { ChainTokenLogo } from "./chain-token-logo";
import { useMediaQuery } from "@/registry/token-selector/hooks/useMediaQuery";

export type Token = {
  chain: string;
  chain_id: string;
  address: string;
  amount: string;
  symbol?: string;
  decimals?: number;
  price_usd?: number;
  value_usd?: number;
};

export interface TokenSelectorProps {
  token?: Token;
  defaultToken?: Token;
  onTokenChange: React.Dispatch<React.SetStateAction<Token | undefined>>;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  form?: string;
  wallet?: string;
  chainId?: ChainIds[];
  excludeSpamTokens?: boolean;
  excludeTokens?: string[];
  className?: string;
}

export interface TokenListItemProps {
  itemKey: string;
  selectedToken: Token | undefined;
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | undefined>>;
  token: Token;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenSelector: React.FC<TokenSelectorProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading: isBalancesLoading } = useEvmTokenBalances(
    props.wallet as `0x${string}`,
    {
      excludeSpamTokens: props.excludeSpamTokens,
      chainIds: props.chainId ? props.chainId[0] : undefined,
    }
  );
  const balances = data?.balances;

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

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm">Select a token</DialogTitle>
          </DialogHeader>

          <TokenSelection
            isBalancesLoading={isBalancesLoading}
            balances={balances}
            selectedToken={props.token}
            onSelectedTokenChange={props.onTokenChange}
            setOpen={setOpen}
          />
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
          <DrawerTitle className="text-sm">Select a token</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <TokenSelection
            isBalancesLoading={isBalancesLoading}
            balances={balances}
            selectedToken={props.token}
            onSelectedTokenChange={props.onTokenChange}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const TokenSelection: React.FC<{
  isBalancesLoading: boolean;
  balances: Array<Token> | undefined;
  selectedToken: Token | undefined;
  onSelectedTokenChange: React.Dispatch<
    React.SetStateAction<Token | undefined>
  >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  isBalancesLoading,
  balances,
  selectedToken,
  onSelectedTokenChange,
  setOpen,
}) => {
  return (
    <Command
      defaultValue="-" // to avoid default selected item
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
            {balances?.map((token) => {
              const key = tokenKey(token);
              return (
                <TokenListItem
                  key={key}
                  itemKey={key}
                  token={token}
                  selectedToken={selectedToken}
                  setSelectedToken={onSelectedTokenChange}
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
  token,
  setOpen,
}) => {
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
};

export default TokenSelector;
