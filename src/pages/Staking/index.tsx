import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { PoolCard } from 'containers';

import { stakesTemp } from './mock';

import s from './Staking.module.scss';

const Staking: FC = observer(() => {
  // const { stakes: stakeStore, user } = useMst();
  // const [stakes, setStakes] = useState<any>(null);
  //
  // useEffect(() => {
  //   if (user.address !== '' && stakeStore.data.length === 0) {
  //     stakeStore.fetchStakesData();
  //     setStakes(stakeStore.data);
  //   }
  // }, [user.address, stakeStore]);

  return (
    <div className={s.staking_wrapper}>
      <div className={s.staking_preview}>
        <div className={s.title}>Staking</div>
        <div className={s.subtitle}>Simply stake tokens to earn. High APR, low risk.</div>
      </div>
      <div className={s.pools_wrapper}>
        {stakesTemp && stakesTemp.map((stake: any) => <PoolCard key={stake.id} stake={stake} />)}
      </div>
    </div>
  );
});

export default Staking;
