import { ChainIds } from "@/constants/chains";
import { Token } from "@/types";
import * as React from "react";

export interface ChainSelectorProps {
  allowedChains: ChainIds[];
  selectedChain?: ChainIds;
  setSelectedChain: React.Dispatch<React.SetStateAction<ChainIds | undefined>>;
  className?: string;
}

export interface ChainSelectionProps {
  allowedChains: ChainIds[];
  selectedChain: ChainIds | undefined;
  setSelectedChain: React.Dispatch<React.SetStateAction<ChainIds | undefined>>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChainSelectionDrawerProps {
  chainDrawerOpen: boolean;
  setChainDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChain: ChainIds | undefined;
  setSelectedChain: React.Dispatch<React.SetStateAction<ChainIds | undefined>>;
  allowedChains: ChainIds[];
}

export interface ChainListItemProps {
  chainId: ChainIds;
  selectedChain: ChainIds | undefined;
  setSelectedChain: React.Dispatch<React.SetStateAction<ChainIds | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TokenSelectionProps {
  isBalancesLoading: boolean;
  balances: Token[] | undefined;
  selectedToken: Token | undefined;
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | undefined>>;
  setSelectedChain: React.Dispatch<React.SetStateAction<ChainIds | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TokenListItemProps {
  itemKey: string;
  selectedToken: Token | undefined;
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | undefined>>;
  setSelectedChain: React.Dispatch<React.SetStateAction<ChainIds | undefined>>;
  token: Token;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
