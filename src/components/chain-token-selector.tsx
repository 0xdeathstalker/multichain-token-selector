"use client";

import { ChainLogo, ChainTokenLogo } from "@/components/chain-token-logo";
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ChainIds, CHAINS } from "@/constants/chains";
import { useEvmTokenBalances } from "@/lib/hooks/useTokenBalances";
import {
  capitalize,
  cn,
  formatNumber,
  formatTokenAmount,
  getChains,
  removeChar,
  tokenKey,
} from "@/lib/utils";
import { Token } from "@/types";
import { ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

interface ChainAndTokenSelectorProps {
  token?: Token;
  defaultToken?: Token;
  onTokenChange: Dispatch<SetStateAction<Token | undefined>>;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  form?: string;
  wallet?: string;
  excludeSpamTokens?: boolean;
  excludeTokens?: string[];
  chain: ChainIds | undefined;
  setChain: Dispatch<SetStateAction<ChainIds | undefined>>;
  className?: string;
}

const ChainAndTokenSelector: React.FC<ChainAndTokenSelectorProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading: isBalancesLoading } = useEvmTokenBalances(
    props.wallet as `0x${string}`,
    { excludeSpamTokens: props.excludeSpamTokens, chainIds: props.chain }
  );
  const balances = data?.balances;

  const allowedChains = getChains();

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
};

const ChainSelection: React.FC<{
  allowedChains: ChainIds[];
  selectedChain: ChainIds | undefined;
  setSelectedChain: Dispatch<SetStateAction<ChainIds | undefined>>;
}> = ({ allowedChains, selectedChain, setSelectedChain }) => {
  useEffect(() => {
    if (selectedChain) {
      // a small delay to ensure the dialog is fully rendered
      setTimeout(() => {
        const element = document.querySelector(
          `[data-chain-id="${selectedChain}"]`
        );
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, 100);
    }
  }, [selectedChain]);

  return (
    <Command className="max-w-48 min-h-[340px] max-h-[45svh] bg-transparent border">
      <CommandInput placeholder="Search chain..." className="text-xs" />
      <CommandList>
        <CommandEmpty className="text-xs text-center py-3">
          No chain found.
        </CommandEmpty>

        <CommandGroup>
          {allowedChains.map((chainId) => (
            <CommandItem
              key={chainId}
              value={`${CHAINS[chainId]}-${chainId}`}
              data-chain-id={chainId}
              onSelect={() => {
                setSelectedChain(chainId);
              }}
              className={cn(
                "text-xs border",
                selectedChain === chainId
                  ? "border-border bg-secondary"
                  : "border-transparent"
              )}
            >
              <ChainLogo chainId={chainId} />
              {capitalize(removeChar(CHAINS[chainId]))}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

const TokenSelection: React.FC<{
  isBalancesLoading: boolean;
  balances: Token[] | undefined;
  selectedToken: Token | undefined;
  setSelectedToken: Dispatch<SetStateAction<Token | undefined>>;
  setSelectedChain: Dispatch<SetStateAction<ChainIds | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({
  isBalancesLoading,
  balances,
  selectedToken,
  setSelectedToken,
  setSelectedChain,
  setOpen,
}) => {
  return (
    <Command className="min-h-[340px] max-h-[45svh] bg-transparent border">
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

const TokenListItem: React.FC<{
  itemKey: string;
  selectedToken: Token | undefined;
  setSelectedToken: Dispatch<SetStateAction<Token | undefined>>;
  setSelectedChain: Dispatch<SetStateAction<ChainIds | undefined>>;
  token: Token;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({
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
        setSelectedChain(token.chain_id.toString() as ChainIds);
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

export default ChainAndTokenSelector;
