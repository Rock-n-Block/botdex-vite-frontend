import { FC, useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useMst } from '../../../store';
import { observer } from 'mobx-react-lite';

import { Button } from 'components';
import { convertSeconds } from 'utils';

import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import lock from 'assets/img/icons/lock.svg';

import s from './PoolCard.module.scss';

const PoolCard: FC<any> = observer(({ stake }) => {
  const { connect } = useWalletConnectorContext();
  const { user } = useMst();
  const [isOpenDetails, setOpenDetails] = useState<boolean>(false);

  const connectToWallet = useCallback(() => {
    connect(chainsEnum['Binance-Smart-Chain'], 'MetaMask').catch(() => {});
  }, [connect]);

  const handleToggleDetailsClick = useCallback(() => {
    setOpenDetails(!isOpenDetails);
  }, [isOpenDetails]);

  return (
    <div className={s.stake_card}>
      <div className={s.stake_card__content}>
        <div className={s.stake_card__lock}>
          <img src={lock} alt="lock" />
        </div>
        <div className="text-500">Lock for a {convertSeconds(stake.timeLockUp)}</div>
        <div className={s.stake_card__percent_wrapper}>
          <div className={s.percent}>{stake.APY / 10}%</div>
          <span className={s.percent_token}>in BOT</span>
        </div>
        <div className="text-smd text-500">Start staking</div>
        {user.address === '' && (
          <Button size="sm" color="white" className={s.stake_card__btn} onClick={connectToWallet}>
            <span className="text-ssmd text-bold">Unlock Wallet</span>
          </Button>
        )}
        {user.address !== '' && (
          <Button size="sm" color="white" className={s.stake_card__btn} onClick={() => {}}>
            <span className="text-ssmd text-bold">Stake</span>
          </Button>
        )}
        {!isOpenDetails && (
          <Button size="sm" color="blue" onClick={handleToggleDetailsClick}>
            <span>Details</span>
          </Button>
        )}
      </div>
      <CSSTransition
        unmountOnExit
        mountOnEnter
        in={isOpenDetails}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        classNames="show"
      >
        <div className={s.details_wrapper}>1</div>
      </CSSTransition>
    </div>
  );
});

export default PoolCard;
