import { cast, SnapshotOut, types } from 'mobx-state-tree';

const UserDataItem = types.model('UserDataItem', {
  allowance: types.string,
  tokenBalance: types.string,
  stakedBalance: types.string,
  earnings: types.string,
});
export type IUserDataItem = SnapshotOut<typeof UserDataItem>;

const TokenItem = types.model('TokenItem', {
  symbol: types.string,
  address: types.string,
  decimals: types.number,
  projectLink: types.string,
  logoURI: types.string,
  busdPrice: types.optional(types.string, ''),
});
export type ITokenItem = SnapshotOut<typeof TokenItem>;

const FarmItem = types.model('FarmItem', {
  id: types.number,
  lpSymbol: types.string,
  lpAddresses: types.string,
  token: TokenItem,
  quoteToken: TokenItem,
  multiplier: types.maybe(types.string),
  categoryType: types.string,
  tokenAmountMc: types.maybe(types.string),
  quoteTokenAmountMc: types.maybe(types.string),
  tokenAmountTotal: types.maybe(types.string),
  quoteTokenAmountTotal: types.maybe(types.string),
  lpTotalInQuoteToken: types.maybe(types.string),
  lpTotalSupply: types.maybe(types.string),
  tokenPriceVsQuote: types.maybe(types.string),
  poolWeight: types.maybe(types.string),
  userData: types.maybe(UserDataItem),
});
export type IFarmItem = SnapshotOut<typeof FarmItem>;

const Farms = types
  .model({
    items: types.array(FarmItem),
    isRefresh: types.boolean,
  })
  .actions((self) => ({
    setFarms: (items: IFarmItem[]) => {
      self.items = cast(items);
    },
    refreshData: (value: boolean) => {
      self.isRefresh = value;
    },
  }));
export default Farms;
