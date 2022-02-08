import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import { useMst } from '../../../store';
import { observer } from 'mobx-react-lite';

import { Button, Input, Modal, Slider } from 'components';

import { useApprove } from '../../../hooks';
import { useWalletConnectorContext } from '../../../services';
import { IModalProps } from 'types';

import { contracts } from '../../../config';
import { checkValueDecimals } from '../../../utils';

import s from './StakeModal.module.scss';

const percentBoundariesButtons = [
  {
    value: 25,
    name: '25%',
  },
  {
    value: 50,
    name: '50%',
  },
  {
    value: 75,
    name: '75%',
  },
  {
    value: 100,
    name: 'Max',
  },
];
interface IStakeModalProps extends IModalProps {
  poolId: number;
}
const StakeModal: FC<IStakeModalProps> = observer(({ poolId, visible, onClose }) => {
  const { walletService } = useWalletConnectorContext();
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState(25);
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const { user, pools } = useMst();

  // const countDecimals = useCallback((value: any) => {
  //   if (Math.floor(value) === value) return 0;
  //   return value.toString().split('.')[1].length || 0;
  // }, []);

  const setValueByPercent = useCallback(() => {
    const result = (parseInt(balance, 10) * percent) / 100;
    setAmount(result.toFixed(0).toString());
  }, [balance, percent]);

  const setPercentByValue = useCallback(
    (value: any) => {
      setPercent((parseInt(value, 10) * 100) / parseInt(balance, 10));
    },
    [balance],
  );

  const handleChangeAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value;
      if (!e.target.value) {
        value = '0';
      } else {
        value = checkValueDecimals(parseInt(e.target.value, 10).toString(), 18);
      }
      if (parseInt(e.target.value, 10) > parseInt(balance, 10)) {
        value = balance;
      }
      setAmount(value);
      setPercentByValue(value);
    },
    [balance, setPercentByValue],
  );

  const handleChangePercent = useCallback(
    (newPercentValue: number) => {
      if (percent === newPercentValue) return;
      setPercent(newPercentValue);
    },
    [percent],
  );

  const handleStake = useCallback(async () => {
    if (user.address) {
      try {
        setLoading(true);
        const trxAmount = await walletService.calcTransactionAmount(
          contracts.params.BOT[contracts.type].address,
          amount,
        );
        await walletService.createTransaction({
          method: 'enterStaking',
          data: [poolId, trxAmount],
          contract: 'STAKING',
        });
        setLoading(false);
        setAmount('0');
        onClose();
        pools.refreshData(true);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  }, [amount, onClose, poolId, pools, user.address, walletService]);

  const getUserBalance = useCallback(async () => {
    if (user.address) {
      try {
        const userBalance = await walletService.callContractMethod({
          contractName: 'BOT',
          methodName: 'balanceOf',
          contractAddress: contracts.params.BOT[contracts.type].address,
          contractAbi: contracts.params.BOT[contracts.type].abi,
          data: [user.address],
        });
        const userBalanceConvert = await walletService.weiToEth(
          contracts.params.BOT[contracts.type].address,
          userBalance,
          0,
        );
        setBalance(userBalanceConvert);
      } catch (err) {
        console.log(err);
      }
    }
  }, [walletService, user.address]);

  const [isApproved, isApproving, handleApprove] = useApprove({
    tokenName: 'BOT',
    approvedContractName: 'STAKING',
    amount,
    walletAddress: user.address,
  });

  useEffect(() => {
    getUserBalance();
  }, [getUserBalance]);

  useEffect(() => {
    setValueByPercent();
  });

  return (
    <Modal title="Stake in Pool" visible={visible} onClose={onClose} className={s.stake_modal}>
      <div className={s.stake_modal_content}>
        <div className={s.stake_modal_header}>
          <span>Stake</span>
          <span>BOT</span>
        </div>
        <div className={s.input_wrapper}>
          <Input
            value={amount}
            positiveOnly
            isNumber
            className={s.deposit__input}
            onChange={handleChangeAmount}
          />
        </div>
        <div className={s.balance}>Balance: {balance}</div>
        <div className={s.slider_wrapper}>
          <Slider value={percent} onChange={handleChangePercent} />
        </div>
        <div className={s.percent_btns_wrapper}>
          {percentBoundariesButtons.map(({ value, name = value }) => {
            const percentChangeHandler = () => handleChangePercent(value);
            return (
              <Button key={name} color="gray" size="sm" onClick={percentChangeHandler}>
                {name}
              </Button>
            );
          })}
        </div>
        {isApproved ? (
          <Button isFullWidth color="pink" loading={loading} onClick={handleStake}>
            Confirm
          </Button>
        ) : (
          <Button isFullWidth color="pink" loading={isApproving} onClick={handleApprove}>
            Approve Token
          </Button>
        )}
        <Button className={s.btn_get_bot} isFullWidth size="lg" color="outline">
          Get BOT
        </Button>
      </div>
    </Modal>
  );
});

export default StakeModal;
