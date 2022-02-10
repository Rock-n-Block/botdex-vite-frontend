import { FC } from 'react';

import { Popover } from 'components';

import { InfoImg } from 'assets/img';

import s from './FarmPopover.module.scss';

export interface IBasePopover {
  className?: string;
  text: JSX.Element | string;
}

const BasePopover: FC<IBasePopover> = ({ className, text, ...props }) => {
  return (
    <Popover
      className={className}
      content={<span className={s.popover_text}>{text}</span>}
      overlayInnerStyle={{ borderRadius: '12px' }}
      {...props}
    >
      <img src={InfoImg} style={{ marginBottom: 2 }} alt="" />
    </Popover>
  );
};

export default BasePopover;
