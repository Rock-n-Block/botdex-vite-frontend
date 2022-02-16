import { FC } from 'react';

import { Button } from 'components';

import { ArrowLgImg, RecentImg, SettingsImg } from 'assets/img';

import s from './ExchangeForm.module.scss';

const ExchangeForm: FC = () => {
  return (
    <div className={s.exchange_form}>
      <div className={s.head}>
        <div className={s.title}>Exchange</div>
        <div className={s.controls}>
          <div>
            <SettingsImg />
          </div>
          <div>
            <RecentImg />
          </div>
        </div>
      </div>
      <div className={s.subtitle}>
        <span>Trade tokens in an instant</span>
      </div>
      <div className={s.line} />
      <div className={s.chooseTokens}>
        <Button color="gray" isFullWidth>
          Select a Token
        </Button>

        <div className={s.line}>
          <div>
            <ArrowLgImg />
          </div>
        </div>

        <Button color="gray" isFullWidth>
          Select a Token
        </Button>
      </div>
      <Button color="pink" className={s.exchangeBtn} isFullWidth>
        Select Tokens
      </Button>
    </div>
  );
};

export default ExchangeForm;
