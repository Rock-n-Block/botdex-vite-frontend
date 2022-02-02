import { useCallback, useEffect, useState } from 'react';

import { useWalletConnectorContext } from 'services';
import { TNullable } from 'types';

export default (
  userAddress: TNullable<string>,
  tokenAddress?: string,
  isIntervalUpdate = false,
): [string, string] => {
  const [balance, setBalance] = useState<string>('');
  const [decimals, setDecimals] = useState<string>('');

  const { walletService } = useWalletConnectorContext();

  const getUserTokenBalance = useCallback(async () => {
    let method: 'getTokenBalance' | 'getBalance' = 'getTokenBalance';
    if (!tokenAddress) {
      method = 'getBalance';
    }
    const tokenBalance = await walletService[method](tokenAddress || '');
    const amount = await walletService.weiToEth(tokenBalance, tokenAddress);

    setBalance(amount);
  }, [tokenAddress, walletService]);

  const getTokenDecimals = useCallback(async () => {
    if (tokenAddress) {
      const tokenDecimals = await walletService.getTokenDecimals(tokenAddress);
      setDecimals(tokenDecimals);
    } else {
      setDecimals('18');
    }
  }, [tokenAddress, walletService]);

  useEffect(() => {
    getTokenDecimals();
  }, [getTokenDecimals]);

  useEffect(() => {
    let interval: any = null;
    if (userAddress) {
      getUserTokenBalance();

      if (isIntervalUpdate && !interval) {
        interval = setInterval(getUserTokenBalance, 30000);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [getUserTokenBalance, userAddress, isIntervalUpdate]);

  return [balance, decimals];
};
