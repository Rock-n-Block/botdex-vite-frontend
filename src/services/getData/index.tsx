import { FC, useCallback, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';
// import { IFarmItem } from 'store/Models/Farms';
import { IPoolItem, IUserDataItem as PoolsUserData } from 'store/Models/Pools';

import { contracts } from 'config';
import { farms as farmsConfig } from 'config/farms';

import { FarmConfig } from '../../types';
import { useWalletConnectorContext } from 'services';

const GetData: FC = ({ children }) => {
  const { walletService } = useWalletConnectorContext();
  const { farms, user, pools } = useMst();

  // GET FARMS DATA
  const getFarms = useCallback(async () => {
    try {
      const promises: Promise<FarmConfig>[] = farmsConfig.map(async (farm) => {
        const { lpAddresses, token, quoteToken } = farm;
        const calls = [
          // Balance of token in the LP contract
          {
            address: token.address,
            name: 'balanceOf',
            params: [lpAddresses],
          },
          // Balance of quote token on LP contract
          {
            address: quoteToken.address,
            name: 'balanceOf',
            params: [lpAddresses],
          },
          // Balance of LP tokens in the master chef contract
          {
            address: lpAddresses,
            name: 'balanceOf',
            params: [contracts.params.FARMS[contracts.type].address],
          },
          // Total supply of LP tokens
          {
            address: lpAddresses,
            name: 'totalSupply',
          },
          // Token decimals
          {
            address: token.address,
            name: 'decimals',
          },
          // Quote token decimals
          {
            address: quoteToken.address,
            name: 'decimals',
          },
        ];
        console.log(calls);

        // const [
        //   tokenBalanceLP,
        //   quoteTokenBalanceLP,
        //   lpTokenBalanceMC,
        //   lpTotalSupply,
        //   tokenDecimals,
        //   quoteTokenDecimals,
        // ] = await multicall(contracts.params.ERC20[contracts.type].abi, calls);
        // console.log({
        //   tokenBalanceLP,
        //   quoteTokenBalanceLP,
        //   lpTokenBalanceMC,
        //   lpTotalSupply,
        //   tokenDecimals,
        //   quoteTokenDecimals,
        // });
        return farm;
      });

      console.log(promises);
      // Promise.all(promises).then((res) => {
      //   const farmsFinal = res.map(
      //     (item: IFarmItem) =>
      //       ({
      //         id: item.id,
      //       } as IFarmItem),
      //   );
      //   farms.setFarms(farmsFinal);
      // });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err get farms', err);
    }
  }, []);

  const getFarmsData = useCallback(async () => {
    await getFarms();
  }, [getFarms]);

  // GET POOLS DATA
  const getPools = useCallback(async () => {
    try {
      const poolsCount = await walletService.callContractMethod({
        contractName: 'STAKING',
        methodName: 'getPoolLength',
        contractAddress: contracts.params.STAKING[contracts.type].address,
        contractAbi: contracts.params.STAKING[contracts.type].abi,
      });

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
                amount: '0',
                start: '0',
              },
            } as IPoolItem),
        );
        pools.setPools(poolsFinal);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err get pools', err);
    }
  }, [walletService, pools]);

  const getPoolsUserData = useCallback(async () => {
    if (user.address) {
      try {
        const poolsCount = await walletService.callContractMethod({
          contractName: 'STAKING',
          methodName: 'getPoolLength',
          contractAddress: contracts.params.STAKING[contracts.type].address,
          contractAbi: contracts.params.STAKING[contracts.type].abi,
        });

        const userDataPromises: Array<Promise<PoolsUserData>> = new Array(+poolsCount)
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

        Promise.all(userDataPromises).then((res) => {
          const userData = res.map(
            (item: PoolsUserData) =>
              ({
                amount: item.amount,
                start: item.start,
              } as PoolsUserData),
          );
          pools.setUserData(userData);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [pools, user.address, walletService]);

  const getPoolsData = useCallback(async () => {
    await getPools();
    await getPoolsUserData();
  }, [getPools, getPoolsUserData]);

  useEffect(() => {
    getFarmsData().then();
  }, [getFarmsData]);

  useEffect(() => {
    if (farms.isRefresh) {
      getFarmsData().then(() => {
        farms.refreshData(false);
      });
    }
  }, [farms, getFarmsData]);

  useEffect(() => {
    getPoolsData().then();
  }, [getPoolsData]);

  useEffect(() => {
    if (pools.isRefresh) {
      getPoolsData().then(() => {
        pools.refreshData(false);
      });
    }
  }, [getPoolsData, pools.isRefresh, pools]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
export default observer(GetData);
