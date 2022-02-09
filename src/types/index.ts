import BigNumber from 'bignumber.js/bignumber';

export * from './connect';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export interface IModalProps {
  className?: string;
  visible: boolean;
  onClose: () => void;
  title?: string;
}

export interface Address extends Record<string, string> {
  // [key: string]: string;
  '97': string;
}

export interface Token {
  symbol: string;
  address: Address;
  decimals?: number;
  projectLink?: string;
  logoURI?: string;
  busdPrice?: string;
}

export enum DetailsBadgeType {
  core = 'core',
}
export type IDetailsBadgeType = keyof typeof DetailsBadgeType;
export type SerializedBigNumber = string;

export interface FarmConfig {
  pid: number;
  lpSymbol: string;
  lpAddresses: Address;
  token: Token;
  quoteToken: Token;
  multiplier?: string;
  categoryType: IDetailsBadgeType;
}

interface FarmUserData {
  allowance: string;
  tokenBalance: string;
  stakedBalance: string;
  earnings: string;
}

export interface FarmWithoutUserData extends FarmConfig {
  tokenAmountMc?: SerializedBigNumber;
  quoteTokenAmountMc?: SerializedBigNumber;
  tokenAmountTotal?: SerializedBigNumber;
  quoteTokenAmountTotal?: SerializedBigNumber;
  lpTotalInQuoteToken?: SerializedBigNumber;
  lpTotalSupply?: SerializedBigNumber;
  tokenPriceVsQuote?: SerializedBigNumber;
  poolWeight?: SerializedBigNumber;
}

export interface Farm extends FarmWithoutUserData {
  userData?: FarmUserData;
}

export interface FarmWithStakedValue extends Farm {
  apr?: number;
  lpRewardsApr?: number;
  liquidity?: BigNumber;
}
