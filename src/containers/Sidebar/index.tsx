import { FC, Fragment, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import cn from 'classnames';
import { routes } from 'router';

import { Button } from '../../components';

import { useWalletConnectorContext } from '../../services';
import { chainsEnum } from '../../types';

import { addressWithDots } from '../../utils';

import { ArrowImg, Logo, LogoText, MoreImg, WalletImg } from 'assets/img';

import s from './Sidebar.module.scss';

const Sidebar: FC = observer(() => {
  const { pathname } = useLocation();
  const { connect } = useWalletConnectorContext();
  const { user, sidebar } = useMst();
  const [isOpenShowMore, setOpenShowMore] = useState<boolean>(false);

  const connectToWallet = useCallback(() => {
    connect(chainsEnum['Binance-Smart-Chain'], 'MetaMask').catch(() => {});
  }, [connect]);
  const handleOpenShowMore = useCallback(() => {
    setOpenShowMore(!isOpenShowMore);
  }, [isOpenShowMore]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={sidebar.toggleSidebar}
        className={cn(s.sidebar_cover, { [s.active]: sidebar.isOpen })}
      />
      <div className={cn(s.sidebar_wrapper, sidebar.isOpen && s.active)}>
        <div className={s.sidebar}>
          <div className={s.logo_wrapper}>
            <Logo />
            <LogoText />
          </div>
          {!user.address ? (
            <Button className={s.btn_mobile} color="blue" onClick={connectToWallet}>
              <WalletImg />
              <span>Connect Wallet</span>
            </Button>
          ) : (
            <Button className={s.btn_mobile} color="blue" onClick={() => {}}>
              <WalletImg />
              <span>{addressWithDots(user.address)}</span>
            </Button>
          )}
          <div className={s.menu}>
            {routes.map(({ name, path, icon, menu }) => {
              if (menu) {
                return (
                  <Link
                    to={path}
                    key={name}
                    className={cn(s.menu_link, pathname === path && s.active)}
                  >
                    <img src={icon} alt={name} />
                    <span>{name}</span>
                  </Link>
                );
              }
              return <Fragment key={name} />;
            })}
            <div
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
              className={s.menu_link}
              onClick={handleOpenShowMore}
            >
              <img src={MoreImg} alt="" />
              <span>More</span>
              <div className={cn(s.menu_link_arrow, isOpenShowMore && s.active)}>
                <img src={ArrowImg} alt="" />
              </div>
            </div>
            <CSSTransition
              unmountOnExit
              mountOnEnter
              in={isOpenShowMore}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames="show_more"
            >
              <div className={s.show_more_wrapper}>
                <Link to="/coming-soon" className={s.show_more_link}>
                  GameFi
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Marketplace
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Lottery
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Wallet
                </Link>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </>
  );
});

export default Sidebar;
