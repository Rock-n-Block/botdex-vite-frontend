import { FC, useCallback, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';
import { IPoolItem, IUserDataItem } from 'store/Models/Pools';

import { contracts } from 'config';

import { useWalletConnectorContext } from 'services';

const GetData: FC = ({ children }) => {
  const { walletService } = useWalletConnectorContext();
  const { user, pools } = useMst();

  const getPools = useCallback(async () => {
    try {
      const poolsCount = await walletService.callContractMethod({
        contractName: 'STAKING',
        methodName: 'getPoolLength',
        contractAddress: contracts.params.STAKING[contracts.type].address,
        contractAbi: contracts.params.STAKING[contracts.type].abi,
      });

      const userDataPromises: Array<Promise<IUserDataItem>> = new Array(+poolsCount)
        .fill(0)
        .map((index) =>
          walletService.callContractMethod({
            contractName: 'STAKING',
            methodName: 'userAtPoolInfo',
            contractAddress: contracts.params.STAKING[contracts.type].address,
            contractAbi: contracts.params.STAKING[contracts.type].abi,
            data: [user.address, index],
          }),
        );
      const userData: IUserDataItem[] = await Promise.all(userDataPromises);

      const promises: Array<Promise<IPoolItem>> = new Array(+poolsCount).fill(0).map((_, index) =>
        walletService.callContractMethod({
          contractName: 'STAKING',
          methodName: 'pools',
          contractAddress: contracts.params.STAKING[contracts.type].address,
          contractAbi: contracts.params.STAKING[contracts.type].abi,
          data: [index],
        }),
      );

      Promise.all(promises).then((res) => {
        const poolsFinal = res.map(
          (item: IPoolItem, index) =>
            ({
              id: index,
              amountStaked: item.amountStaked,
              timeLockUp: item.timeLockUp,
              APY: item.APY,
              isDead: item.isDead,
              userData: {
                amount: userData[index].amount,
                start: userData[index].start,
              },
            } as IPoolItem),
        );
        pools.setPools(poolsFinal);
      });
    } catch (err) {
      console.log('err get pools', err);
    }
  }, [walletService, user.address, pools]);

  const getPoolData = useCallback(async () => {
    await getPools();
  }, [getPools]);

  useEffect(() => {
    getPoolData().then();
  }, [getPoolData]);

  useEffect(() => {
    if (pools.isRefresh) {
      getPoolData().then(() => {
        pools.refreshData(false);
      });
    }
  }, [getPoolData, pools.isRefresh, pools]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
export default observer(GetData);
