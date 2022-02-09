import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';
import { IPoolItem } from 'store/Models/Pools';

import { PoolCard } from 'containers';

import s from './Staking.module.scss';

const Staking: FC = observer(() => {
  const { pools } = useMst();

  return (
    <div className={s.staking_wrapper}>
      <div className={s.staking_preview}>
        <div className={s.title}>Staking</div>
        <div className={s.subtitle}>Simply stake tokens to earn. High APR, low risk.</div>
      </div>
      <div className={s.pools_wrapper}>
        {pools.items.map((pool: IPoolItem) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>
    </div>
  );
});

export default Staking;
