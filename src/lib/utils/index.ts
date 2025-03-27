import { Token } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { formatUnits } from "viem";
import { twMerge } from "tailwind-merge";
import numeral from "numeral";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isTokenNative = (address: string) =>
  address &&
  (address === "native" ||
    address.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

export const formatTokenAmount = (_amount: bigint | string, _decimals: number = 18) => {
  if (!_amount) return "0";
  if (typeof _amount === "string") {
    _amount = BigInt(_amount);
  }
  return formatNumber(formatUnits(_amount, _decimals));
}

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
  `${token.chain}:${token.address}`;

export function removeTrailingSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
