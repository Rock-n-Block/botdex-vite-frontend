import { FC } from 'react';

import cn from 'classnames';

import s from './Burger.module.scss';

type Props = {
  onClick: () => void;
  isMenuOpen: boolean;
  className?: string;
};

const Burger: FC<Props> = ({ onClick, isMenuOpen, className }: Props) => (
  <div
    tabIndex={0}
    role="button"
    onKeyDown={() => {}}
    className={cn(s.burger, isMenuOpen && s.burger_active, className)}
    onClick={onClick}
  >
    <div className={cn(s.burger_line, s.burger_line_1)} />
    <div className={cn(s.burger_line, s.burger_line_2)} />
    <div className={cn(s.burger_line, s.burger_line_3)} />
  </div>
);

export default Burger;
