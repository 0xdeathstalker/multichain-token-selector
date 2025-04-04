import { TokenSelectorProps } from "@/components/chain-token-selector/types";

export function TokenSelector({
  token,
  onTokenChange,
  wallet,
  chainId,
}: TokenSelectorProps) {
  return (
    <TokenSelector
      token={token}
      onTokenChange={onTokenChange}
      wallet={wallet}
      chainId={chainId ? chainId : undefined}
      excludeSpamTokens
    />
  );
}
