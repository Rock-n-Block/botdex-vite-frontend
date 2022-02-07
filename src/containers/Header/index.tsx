import { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import cn from 'classnames';

import { Button } from 'components';
import { addressWithDots } from 'utils';

import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import Burger from './Burger';

import { CertikImg, CertikSmImg, HackenImg, HackenSmImg, LogoSm, WalletImg } from 'assets/img';

import s from './Header.module.scss';

const Header: FC = observer(() => {
  const { connect } = useWalletConnectorContext();
  const { user, sidebar } = useMst();
  const { pathname } = useLocation();

  const connectToWallet = useCallback(() => {
    connect(chainsEnum['Binance-Smart-Chain'], 'MetaMask').catch(() => {});
  }, [connect]);
  const toggleSidebar = useCallback(() => {
    sidebar.toggleSidebar();
  }, [sidebar]);

  return (
    <div className={cn(s.header_wrapper, pathname === '/staking' && s.hide)}>
      <div className={s.header}>
        <Burger className={s.burger} onClick={toggleSidebar} isMenuOpen={sidebar.isOpen} />
        <div className={s.logo_mobile}>
          <LogoSm />
        </div>
        <div className={s.audits}>
          <HackenImg />
          <CertikImg />
        </div>
        <div className={s.audits_sm}>
          <HackenSmImg />
          <CertikSmImg />
        </div>
        {!user.address ? (
          <Button className={s.btn_mobile} color="blue" size="sm" onClick={connectToWallet}>
            <WalletImg />
            <span>Connect Wallet</span>
          </Button>
        ) : (
          <Button className={s.btn_mobile} color="blue" size="sm" onClick={() => {}}>
            <WalletImg />
            <span>{addressWithDots(user.address)}</span>
          </Button>
        )}
      </div>
    </div>
  );
});

export default Header;
