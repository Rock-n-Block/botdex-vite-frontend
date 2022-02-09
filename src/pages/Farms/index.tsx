import { FC } from 'react';

import { FarmsFilter, FarmsTable } from 'containers/Farms';

import s from './Farms.module.scss';

const Farms: FC = () => {
  return (
    <div className={s.farms_wrapper}>
      <div className={s.farms_preview}>
        <div className={s.title}>Farms</div>
        <div className={s.subtitle}>Stake Liquidity Pool (LP) tokens to earn.</div>
      </div>
      <FarmsFilter />
      <FarmsTable />
    </div>
  );
};

export default Farms;
