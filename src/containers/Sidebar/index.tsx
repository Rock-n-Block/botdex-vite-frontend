import { FC, Fragment, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import cn from 'classnames';
import { routes } from 'router';

import { ArrowImg, Logo, LogoText, MoreImg } from 'assets/img';

import s from './Sidebar.module.scss';

const Sidebar: FC = observer(() => {
  const { pathname } = useLocation();
  const { sidebar } = useMst();
  const [isOpenShowMore, setOpenShowMore] = useState<boolean>(false);

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
          <div className={s.menu}>
            {routes.map(({ name, path, icon, menu, comingSoon }) => {
              if (menu) {
                return (
                  <Link
                    to={path}
                    key={name}
                    className={cn(s.menu_link, pathname === path && s.active)}
                  >
                    <img src={icon} alt={name} />
                    <span>{name}</span>
                    {comingSoon && <div className={s.soon}>Soon</div>}
                  </Link>
                );
              }
              return <Fragment key={name} />;
            })}
            <div
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
              className={cn(s.menu_link, isOpenShowMore && s.active)}
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
                  Audit CertiK
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Audit Hacken
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  About $BOT
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Team
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Whitepaper
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Deck
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Partners
                </Link>
                <Link to="/coming-soon" className={s.show_more_link}>
                  Blog
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
