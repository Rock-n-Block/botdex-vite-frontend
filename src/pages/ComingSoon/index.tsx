import { FC } from 'react';

import { LogoMd, LogoTextMd } from 'assets/img';
import mothership from 'assets/img/icons/mothership.png';

import s from './ComingSoon.module.scss';

const ComingSoon: FC = () => {
  return (
    <div className={s.coming_soon_wrapper}>
      <div className={s.logo_wrapper}>
        <LogoMd />
        <LogoTextMd />
      </div>
      <div className={s.coming_soon}>
        <img src={mothership} alt="" />
        <div className={s.title}>Coming Soon</div>
      </div>
    </div>
  );
};

export default ComingSoon;
