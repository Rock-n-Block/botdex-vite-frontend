import { FC, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';
import { routes } from 'router';

import { Logo, LogoText } from 'assets/img';

import s from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const { pathname } = useLocation();
  return (
    <div className={s.sidebar_wrapper}>
      <div className={s.sidebar}>
        <div className={s.logo_wrapper}>
          <Logo />
          <LogoText />
        </div>
        <div className={s.menu}>
          {routes.map(({ name, path, icon, menu }) => {
            console.log(pathname === path);
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
