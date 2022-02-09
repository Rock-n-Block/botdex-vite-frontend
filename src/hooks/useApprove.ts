/* eslint-disable no-console */
import React from 'react';

import { contracts } from 'config';

import { useWalletConnectorContext } from 'services';
import { TNullable } from 'types';

import { getValueDecimals } from '../utils';

const useApprove = ({
  tokenName,
  approvedContractName,
  amount,
  walletAddress,
}: {
  tokenName: string;
  approvedContractName: string;
  amount: string;
  walletAddress: TNullable<string>;
}): [boolean, boolean, () => void] => {
  const { walletService } = useWalletConnectorContext();

  const [isApproved, setApproved] = React.useState(false);
  const [isApproving, setApproving] = React.useState(false);

  const handleApprove = React.useCallback(() => {
    setApproving(true);
    const valueWithDecimals = getValueDecimals(amount, 18);
    walletService
      .approveToken({
        contractName: tokenName,
        approvedAddress: contracts.params?.[approvedContractName][contracts.type].address,
        approveAmount: +valueWithDecimals,
      })
      .then(() => {
        setApproved(true);
      })
      .catch((err) => {
        console.log('err approve stake', err);
        setApproved(false);
      })
      .finally(() => {
        setApproving(false);
      });
  }, [amount, walletService, tokenName, approvedContractName]);

  React.useEffect(() => {
    if (walletAddress) {
      walletService
        .checkTokenAllowance({
          contractName: tokenName,
          approvedAddress: contracts.params?.[approvedContractName][contracts.type].address,
          amount,
        })
        .then((res) => {
          setApproved(res);
        })
        .catch((err) => {
          setApproved(false);
          console.log('check approve stake modal', err);
        });
    }
  }, [walletService, amount, approvedContractName, tokenName, walletAddress]);

  return [isApproved, isApproving, handleApprove];
};

export default useApprove;
