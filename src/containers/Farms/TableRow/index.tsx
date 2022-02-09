import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import { Button } from '../../../components';

import { ArrowImg, CalcImg, ExternalLinkImg, InfoImg, NoLogoToken, VerifiedImg } from 'assets/img';

// import { FarmWithStakedValue } from 'types';
import s from './TableRow.module.scss';

// interface ITableRowProps {
//   farm: FarmWithStakedValue;
// }

const TableRow: FC = observer(() => {
  const [isOpenDetails, setOpenDetails] = useState<boolean>(false);
  const handleToggleDetailsClick = useCallback(() => {
    setOpenDetails(!isOpenDetails);
  }, [isOpenDetails]);

  return (
    <div className={s.farms_table_row}>
      <div className={s.content}>
        <div className={s.currencies}>
          <div className={s.currencies_pair}>
            <img className={s.currencies_pair_item} src={NoLogoToken} alt="currency" />
            <img className={s.currencies_pair_item} src={NoLogoToken} alt="currency" />
          </div>
          <div className={s.currencies_text}>DAI-WBNB</div>
        </div>

        <div className={s.earned}>
          <div className={s.label}>Earned</div>
          <span className={s.value}>0</span>
        </div>

        <div className={s.apr}>
          <div className={s.label}>APR</div>
          <span className={s.value}>{Number(0).toFixed(2).replace('.', ',')}%</span>
          <div
            className={s.apr_btn}
            onClick={() => {}}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <img src={CalcImg} alt="calc" />
          </div>
        </div>

        <div className={s.liquidity}>
          <span className={s.value}>$0</span>
          <img src={InfoImg} alt="calc" />
        </div>

        <div className={s.multiplier}>
          <span className={s.value}>10X</span>
          <img src={InfoImg} alt="calc" />
        </div>

        <div className={cn(s.arrow_dropdown_mob, isOpenDetails && s.active)}>
          <img src={ArrowImg} alt="arrow" />
        </div>
        <Button
          size="sm"
          color="outline"
          className={s.details_btn}
          onClick={handleToggleDetailsClick}
        >
          <span>Details</span>
          <div className={cn(s.arrow_dropdown, isOpenDetails && s.active)}>
            <img src={ArrowImg} alt="arrow" />
          </div>
        </Button>
      </div>

      <CSSTransition
        unmountOnExit
        mountOnEnter
        in={isOpenDetails}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        classNames="show_farm_details"
      >
        <div className={s.farm_details}>
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
        </div>
      </CSSTransition>
    </div>
  );
});

export default TableRow;
