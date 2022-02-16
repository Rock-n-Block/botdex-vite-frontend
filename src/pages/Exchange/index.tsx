import { FC } from 'react';

import { ExchangeForm } from 'components';

import s from './Exchange.module.scss';

const Exchange: FC = () => {
  return (
    <div className={s.exchange_wrapper}>
      <ExchangeForm />
    </div>
  );
};
export default Exchange;
