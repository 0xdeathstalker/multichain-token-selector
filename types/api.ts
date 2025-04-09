export type Balance = {
  chain: string;
  chain_id: number;
  address: string;
  amount: string;
  symbol: string;
  decimals: number;
  price_usd: number;
  value_usd: number;
  name?: string;
  pool_size?: number;
};

export type BalanceResponse = {
  next_offset: string;
  request_time: Date;
  response_time: Date;
  wallet_address: `0x${string}`;
  balances: Array<Balance>;
};
