import { env } from "@/env";
import { Token } from "@/types";
import { BalanceResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

type UseTokenBalancesParams = {
  address: `0x${string}` | undefined;
};

export default function useTokenBalances({ address }: UseTokenBalancesParams) {
  if (!address) throw new Error("Address not found!");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["token-balances", address],
    queryFn: async () => {
      const response = await fetch(
        `https://api.dune.com/api/echo/v1/balances/evm/${address}`,
        {
          headers: {
            "X-Dune-Api-Key": env.NEXT_PUBLIC_DUNE_API_KEY,
          },
        }
      );
      const data = await response.json();
      return data as BalanceResponse;
    },
    enabled: !!address,
  });

  const newBalances = data?.balances.reduce(
    (acc: Record<string, Token>, token) => {
      const key = `${token.chain_id}-${
        token.address === "native"
          ? "0x0000000000000000000000000000000000000000"
          : token.address
      }`;
      acc[key] = {
        id: key,
        chain_id: token.chain_id.toString(),
        amount: (Number(token.amount) / Math.pow(10, token.decimals)).toFixed(
          4
        ),
        decimals: token.decimals,
        symbol: token.symbol,
        value_usd: token.value_usd,
        price_usd: token.price_usd,
      };
      return acc;
    },
    {}
  );

  return {
    balances: newBalances,
    isBalancesLoading: isLoading,
    isBalancesError: isError,
  };
}
