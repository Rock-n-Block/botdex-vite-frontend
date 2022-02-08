import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useMst } from '../../../store';
import { observer } from 'mobx-react-lite';
import { IPoolItem } from 'store/Models/Pools';

import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { format, millisecondsToSeconds } from 'date-fns';

import { Button } from 'components';
import { convertSeconds } from 'utils';

import { useModal } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import { ArrowImg } from '../../../assets/img';
import { contracts } from '../../../config';
import StakeModal from '../StakeModal';

import lock from 'assets/img/icons/lock.svg';

import s from './PoolCard.module.scss';

interface IPoolCardProps {
  pool: IPoolItem;
}

const PoolCard: FC<IPoolCardProps> = observer(({ pool }) => {
  const { connect, walletService } = useWalletConnectorContext();
  const { user, pools } = useMst();
  const [isStakeModalVisible, handleOpenStakeModal, handleCloseStakeModal] = useModal(false);
  const [isOpenDetails, setOpenDetails] = useState<boolean>(false);
  const [collecting, setCollecting] = useState<boolean>(false);
  const [reward, setReward] = useState<string>('0');

  const connectToWallet = useCallback(() => {
    connect(chainsEnum['Binance-Smart-Chain'], 'MetaMask').catch(() => {});
  }, [connect]);

  const handleToggleDetailsClick = useCallback(() => {
    setOpenDetails(!isOpenDetails);
  }, [isOpenDetails]);

  const handleCollectReward = useCallback(async () => {
    try {
      setCollecting(true);
      await walletService.createTransaction({
        method: 'withdrawReward',
        data: [pool.id],
        contract: 'STAKING',
      });
      setCollecting(false);
      pools.refreshData(true);
    } catch (err) {
      console.log(err);
      setCollecting(false);
    }
  }, [pool.id, pools, walletService]);

  const calculateReward = useCallback(async () => {
    if (user.address) {
      try {
        const rewardAmount = await walletService.callContractMethod({
          contractName: 'STAKING',
          methodName: 'calculateReward',
          contractAddress: contracts.params.STAKING[contracts.type].address,
          contractAbi: contracts.params.STAKING[contracts.type].abi,
          data: [pool.id, user.address],
        });
        setReward(
          new BigNumber(rewardAmount).dividedBy(new BigNumber(10).pow(18)).toFixed(7).toString(),
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, [pool.id, user.address, walletService]);

  const calculateCollectTime = useMemo(() => {
    const startDate = parseInt(pool.userData.start, 10);
    const timeLockUp = parseInt(pool.timeLockUp, 10);
    const amount = parseInt(pool.userData.amount, 10);
    if (startDate === 0) {
      return format(Date.now() + timeLockUp, 'yyyy.dd.MM');
    }
    if (amount === 0) {
      return format(Date.now() + timeLockUp, 'yyyy.dd.MM');
    }
    const timeGap = millisecondsToSeconds(Date.now()) - startDate;
    if (timeGap < timeLockUp) {
      return format(Date.now() + timeLockUp, 'yyyy.dd.MM');
    }
    return 0;
  }, [pool.timeLockUp, pool.userData.amount, pool.userData.start]);

  useEffect(() => {
    calculateReward().catch((err) => console.log(err));
  }, [calculateReward]);

  return (
    <>
      <div className={s.stake_card}>
        <div className={s.stake_card__content}>
          <div className={s.stake_card__lock}>
            <img src={lock} alt="lock" />
          </div>
          <div className={s.lock}>Lock for a {convertSeconds(parseInt(pool.timeLockUp, 10))}</div>
          <div className={s.stake_card__percent_wrapper}>
            <div className={s.percent}>{parseInt(pool.APY, 10) / 10}%</div>
            <span className={s.percent_token}>in BOT</span>
          </div>
          <div className={s.start_staking}>Start staking</div>
          {!user.address ? (
            <Button size="sm" color="white" className={s.stake_card__btn} onClick={connectToWallet}>
              <span>Unlock Wallet</span>
            </Button>
          ) : (
            <Button
              size="sm"
              color="white"
              className={s.stake_card__btn}
              onClick={handleOpenStakeModal}
            >
              <span>Stake</span>
            </Button>
          )}
          {!isOpenDetails && (
            <Button size="sm" color="outline" onClick={handleToggleDetailsClick}>
              <span>Details</span>
              <div className={cn(s.arrow_dropdown, isOpenDetails && s.active)}>
                <img src={ArrowImg} alt="" />
              </div>
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
          classNames="show_details"
        >
          <div className={s.details_wrapper}>
            {isOpenDetails && (
              <Button size="sm" color="outline" onClick={handleToggleDetailsClick}>
                <span>Details</span>
                <div className={cn(s.arrow_dropdown, isOpenDetails && s.active)}>
                  <img src={ArrowImg} alt="" />
                </div>
              </Button>
            )}
            <div className={s.label}>Reward</div>
            <div className={s.content}>{reward} BOT</div>
            <div className={s.label}>Payment Date</div>
            {calculateCollectTime !== 0 ? (
              <div className={s.content}>{calculateCollectTime}</div>
            ) : (
              <Button size="sm" color="outline" loading={collecting} onClick={handleCollectReward}>
                <span>Collect Reward</span>
              </Button>
            )}
          </div>
        </CSSTransition>
      </div>
      <StakeModal poolId={pool.id} visible={isStakeModalVisible} onClose={handleCloseStakeModal} />
    </>
  );
});

export default PoolCard;
