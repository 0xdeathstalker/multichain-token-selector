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

export interface TokenSelectorProps {
  token?: Token;
  defaultToken?: Token;
  onTokenChange: React.Dispatch<React.SetStateAction<Token | undefined>>;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  form?: string;
  wallet?: string;
  chains?: ChainIds[];
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
