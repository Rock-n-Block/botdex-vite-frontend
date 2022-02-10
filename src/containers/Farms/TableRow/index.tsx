import { FC, useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useMst } from '../../../store';
import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import { Button } from '../../../components';

import FarmLinks from './FarmLinks';
import FarmPopover from './FarmPopover';

import { ArrowImg, CalcImg, NoLogoToken } from 'assets/img';

// import { FarmWithStakedValue } from 'types';
import s from './TableRow.module.scss';

// interface ITableRowProps {
//   farm: FarmWithStakedValue;
// }
const multiplierPopoverText = (
  <>
    <p>
      The Multiplier represents the proportion of BOT rewards each farm receives, as a proportion of
      the BOT produced each block.
    </p>
    <p>
      For example, if a 1x farm received 1 BOT per block, a 40x farm would receive 40 BOT per block.
    </p>
    <p> This amount is already included in all APR calculations for the farm.</p>
  </>
);

const TableRow: FC = observer(() => {
  const { user } = useMst();
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
          <FarmPopover text="Total value of the funds in this farm’s liquidity pool" />
        </div>

        <div className={s.multiplier}>
          <span className={s.value}>10X</span>
          <FarmPopover text={multiplierPopoverText} />
        </div>

        <div className={cn(s.arrow_dropdown_mob, isOpenDetails && s.active)}>
          <img src={ArrowImg} alt="arrow" />
        </div>
        <Button
          size="sm"
          color={isOpenDetails ? 'pink' : 'outline'}
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
          <FarmLinks />
          <div className={s.actions}>
            <div className={cn(s.earned_wrapper, s.container)}>
              <div className={s.title}>BOT Earned</div>
              <div className={s.harvest_container}>
                <div className={s.earned}>0.0</div>
                <Button
                  size="sm"
                  color="outline"
                  className={s.harvest_btn}
                  onClick={() => {}}
                  disabled
                >
                  <span>Harvest</span>
                </Button>
              </div>
            </div>

            <div className={cn(s.actions_wrapper, s.container)}>
              <div className={s.title}>Start Farming</div>
              {user.address ? (
                <Button color="pink" isFullWidth onClick={() => {}}>
                  Stake LP
                </Button>
              ) : (
                <Button color="pink" onClick={() => {}}>
                  Unlock wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
});

export default TableRow;
