import { cast, SnapshotOut, types } from 'mobx-state-tree';

const UserDataItem = types.model('UserDataItem', {
  amount: types.string,
  start: types.string,
});

export type IUserDataItem = SnapshotOut<typeof UserDataItem>;

const PoolItem = types.model('PoolItem', {
  id: types.identifierNumber,
  amountStaked: types.string,
  timeLockUp: types.string,
  APY: types.string,
  isDead: types.boolean,
  userData: UserDataItem,
});

export type IPoolItem = SnapshotOut<typeof PoolItem>;
// export type TPoolItem = Instance<typeof PoolItem>;

const Pools = types
  .model({
    items: types.array(PoolItem),
    isRefresh: types.boolean,
  })
  .actions((self) => ({
    setPools: (items: IPoolItem[]) => {
      self.items = cast(items);
    },
    setUserData: (items: IUserDataItem[]) => {
      self.items.forEach((item, index) => {
        item.userData = items[index];
      });
    },
    refreshData: (value: boolean) => {
      self.isRefresh = value;
    },
  }));

export default Pools;
