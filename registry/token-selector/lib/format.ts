import numeral from "numeral";
import { formatUnits } from "viem";
import { Token } from "@/registry/token-selector/components/token-selector";

export const formatTokenAmount = (
  _amount: bigint | string,
  _decimals: number = 18
) => {
  if (!_amount) return "0";
  if (typeof _amount === "string") {
    _amount = BigInt(_amount);
  }
  return formatNumber(formatUnits(_amount, _decimals));
};

export const formatNumber = (number: number | string) => {
  if (typeof number === "string") {
    number = parseFloat(number);
  }

  if (isNaN(number)) {
    return "-";
  }

  if (number === 0) {
    return "0";
  }

  if (number >= 1) {
    if (number > 99999) {
      return numeral(number).format("0.[000]a");
    }
    if (number > 9999) {
      return numeral(number).format("0.[00]a");
    }
    return numeral(number).format("0.[000]a");
  }
  if (number < 0.0001) {
    return "<0.0001";
  }
  if (number < 0.001) {
    return numeral(number).format("0.0[0000]");
  }
  if (number < 1) {
    return numeral(number).format("0.00[00]");
  }

  return numeral(number).format("0.[00]");
};

export const tokenKey = (token: Token) =>
  `${token.chain}:${token.address}:${token.symbol}`;

export function removeTrailingSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
