import { FC, useCallback, useState } from 'react';

import { useMst } from '../../../store';
import { observer } from 'mobx-react-lite';

import { Button, Input, Modal, Slider } from 'components';

import { useApprove } from '../../../hooks';
import { IModalProps } from 'types';

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

const StakeModal: FC<IModalProps> = observer(({ visible, onClose }) => {
  const [amount] = useState('');
  const [percent] = useState(25);
  const { user } = useMst();

  const handlePercentChange = useCallback((newPercentValue: number) => {
    console.log(newPercentValue);
  }, []);

  const [isApproved] = useApprove({
    tokenName: 'BOT',
    approvedContractName: 'STAKING',
    amount,
    walletAddress: user.address,
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
            onChange={() => {}}
            value={amount}
            positiveOnly
            isNumber
            className={s.deposit__input}
          />
        </div>
        <div className={s.balance}>Balance: 0</div>
        <div className={s.slider_wrapper}>
          <Slider value={percent} onChange={() => {}} />
        </div>
        <div className={s.percent_btns_wrapper}>
          {percentBoundariesButtons.map(({ value, name = value }) => {
            const percentChangeHandler = () => handlePercentChange(value);
            return (
              <Button key={name} color="gray" size="sm" onClick={percentChangeHandler}>
                {name}
              </Button>
            );
          })}
        </div>
        {isApproved ? (
          <Button isFullWidth color="pink">
            Confirm
          </Button>
        ) : (
          <Button isFullWidth color="pink">
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
