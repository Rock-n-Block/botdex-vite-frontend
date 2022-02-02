import { FC, useCallback, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import { Button } from 'components';
import { contracts } from 'config';

import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import s from './Header.module.scss';

const Header: FC = observer(() => {
  const { connect, walletService } = useWalletConnectorContext();
  const { user } = useMst();
  const connectToWallet = useCallback(() => {
    connect(chainsEnum['Binance-Smart-Chain'], 'MetaMask').catch(() => {});
  }, [connect]);

  // get data before connect
  useEffect(() => {
    walletService
      .callContractMethod({
        contractName: 'STAKING',
        methodName: 'fees',
        data: [1],
        contractAddress: contracts.params.STAKING[contracts.type].address,
        contractAbi: contracts.params.STAKING[contracts.type].abi,
      })
      .then((fees) => {
        console.log(fees, 'fees');
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [walletService]);

  return (
    <div className={s.header_wrapper}>
      {!user.address ? <Button onClick={connectToWallet}>Connect Wallet</Button> : user.address}
    </div>
  );
});

export default Header;
