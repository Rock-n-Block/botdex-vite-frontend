import { CSSProperties, FC, PropsWithChildren, RefObject, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import s from './Button.module.scss';

export interface IButton {
  color?: 'blue' | 'pink' | 'white' | 'gray' | 'outline' | 'disabled';
  size?: 'lg' | 'md' | 'sm';
  isFullWidth?: boolean;
  className?: string;
  onClick?: (event: never) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onMouseLeave?: (event: never) => void;
  onMouseOver?: (event: SyntheticEvent) => void;
  style?: CSSProperties;
  href?: string;
  btnRef?: RefObject<HTMLButtonElement>;
  loading?: boolean;
}

const Button: FC<PropsWithChildren<IButton>> = ({
  color = 'blue',
  size = 'lg',
  isFullWidth = false,
  onClick = () => {},
  className,
  type = 'button',
  children,
  disabled,
  href,
  btnRef,
  loading = false,
  onMouseLeave,
  onMouseOver = () => {},
}) => {
  if (href)
    return (
      <Link
        to={href}
        className={cn(className, s.button, s[color], {
          [s.disabled]: disabled || color === 'disabled',
        })}
      >
        {children}
      </Link>
    );
  return (
    <button
      ref={btnRef}
      type={type === 'submit' ? 'submit' : 'button'}
      className={cn(s.button, s[color], s[size], className, {
        [s.disabled]: disabled || color === 'disabled' || loading,
        [s.isFullWidth]: isFullWidth,
      })}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseOver}
    >
      {loading ? <span>In progress...</span> : children}
    </button>
  );
};

export default Button;
