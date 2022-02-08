import React from 'react';

import { getValueDecimals } from 'utils';

import { useWalletConnectorContext } from 'services';
import { ISendingTokenProps, TNullable } from 'types';

const useApprove = ({
  approvedContractName,
  amount,
  walletAddress,
  token,
  decimals,
}: {
  approvedContractName: string;
  amount: string;
  walletAddress: TNullable<string>;
  token: ISendingTokenProps;
  decimals?: string;
}): [boolean, boolean, () => Promise<any>, string] => {
  const { walletService } = useWalletConnectorContext();
  const [isApproved, setApproved] = React.useState(false);
  const [isApproving, setApproving] = React.useState(false);
  const [tokenDecimals, setTokenDecimals] = React.useState('');

  const handleApprove = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      setApproving(true);
      const valueWithDecimals = getValueDecimals(amount, decimals || tokenDecimals);
      walletService
        .approveToken({
          contractName: 'STAKING',
          approvedAddress: token.address,
          approveAmount: +valueWithDecimals,
        })
        .then(() => {
          setApproved(true);
          resolve(true);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('err approve stake', err);
          setApproved(false);
          reject(err);
        })
        .finally(() => {
          setApproving(false);
        });
    });
  }, [amount, decimals, tokenDecimals, walletService, token.address]);

  React.useEffect(() => {
    if (walletAddress) {
      walletService
        .checkTokenAllowance({
          contractName: approvedContractName,
          approvedAddress: token.address,
          amount,
        })
        .then((res) => {
          setApproved(res.allowance);
          setTokenDecimals(res.tokenDecimals);
        })
        .catch((err) => {
          setApproved(false);
          // eslint-disable-next-line no-console
          console.log('check approve stake modal', err);
        });
    }
  }, [walletService, amount, approvedContractName, walletAddress, token.address]);

  return [isApproved, isApproving, handleApprove, tokenDecimals];
};

export default useApprove;
