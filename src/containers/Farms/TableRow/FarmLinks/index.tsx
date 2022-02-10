import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ExternalLinkImg, VerifiedImg } from '../../../../assets/img';

import s from './FarmLinks.module.scss';

const FarmLinks: FC = () => {
  return (
    <div className={s.links_wrapper}>
      <Link to="/trade/liquidity/add" target="_blank" rel="noreferrer" className={s.link}>
        <span>Get DAI-WBNB LP</span>
        <img src={ExternalLinkImg} alt="link" />
      </Link>
      <a
        href="https://testnet.bscscan.com//address/0x92e999CCB3A368678422e5814ABdD177700ccf93"
        target="_blank"
        rel="noreferrer"
        className={s.link}
      >
        <span>View Contract</span>
        <img src={ExternalLinkImg} alt="link" />
      </a>
      <a
        href="https://testnet.bscscan.com//address/0x92e999CCB3A368678422e5814ABdD177700ccf93"
        target="_blank"
        rel="noreferrer"
        className={s.link}
      >
        <span>See Pair Info</span>
        <img src={ExternalLinkImg} alt="link" />
      </a>
      <div className={s.badge}>
        <span className={s.badge_wrapper}>
          <img src={VerifiedImg} alt="verified core farm" />
          <span className={s.core}>Core</span>
        </span>
      </div>
    </div>
  );
};

export default FarmLinks;
