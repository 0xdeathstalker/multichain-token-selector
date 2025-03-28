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
import { ChainIds, CHAINS, MAINNET_SUPPORTED_CHAINS } from "@/constants/chains";
import { useEvmTokenBalances } from "@/lib/hooks/useTokenBalances";
import {
  capitalize,
  cn,
  formatNumber,
  formatTokenAmount,
  tokenKey,
} from "@/lib/utils";
import { Token } from "@/types";
import { ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

function getChains() {
  return Object.values(MAINNET_SUPPORTED_CHAINS).sort((c1, c2) =>
    c1[0] < c2[0] ? -1 : 1
  );
}

const ChainAndTokenSelector = (props: { wallet: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedChain, setSelectedChain] = useState<ChainIds>("1");
  const [selectedToken, setSelectedToken] = useState<Token>();

  const { data, isLoading: isBalancesLoading } = useEvmTokenBalances(
    props.wallet as `0x${string}`,
    { excludeSpamTokens: true }
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
            {selectedToken?.address && <ChainTokenLogo token={selectedToken} />}
            {selectedToken ? selectedToken.symbol : "Select token..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogTitle className="text-sm">Select a token</DialogTitle>

        <div className="flex items-center gap-3">
          <ChainSelection
            allowedChains={allowedChains}
            selectedChain={selectedChain}
            setSelectedChain={setSelectedChain}
          />

          <TokenSelection
            balances={balances}
            isBalancesLoading={isBalancesLoading}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChainAndTokenSelector;

const ChainSelection = ({
  allowedChains,
  selectedChain,
  setSelectedChain,
}: {
  allowedChains: ChainIds[];
  selectedChain: ChainIds;
  setSelectedChain: Dispatch<SetStateAction<ChainIds>>;
}) => {
  return (
    <Command className="min-h-[340px] max-h-[45svh] bg-transparent border">
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
              {capitalize(CHAINS[chainId])}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

const TokenSelection = ({
  isBalancesLoading,
  balances,
  selectedToken,
  setSelectedToken,
  setOpen,
}: {
  isBalancesLoading: boolean;
  balances: Token[] | undefined;
  selectedToken: Token | undefined;
  setSelectedToken: Dispatch<SetStateAction<Token | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
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
            {Array.from({ length: 9 }).map((_, i) => (
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

const TokenListItem = ({
  itemKey,
  selectedToken,
  setSelectedToken,
  token,
}: // setOpen,
{
  itemKey: string;
  selectedToken: Token | undefined;
  setSelectedToken: Dispatch<SetStateAction<Token | undefined>>;
  token: Token;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const isSelected = selectedToken && tokenKey(selectedToken) === itemKey;
  return (
    <CommandItem
      value={itemKey}
      onSelect={() => {
        setSelectedToken(token);
        // setOpen(false);
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
