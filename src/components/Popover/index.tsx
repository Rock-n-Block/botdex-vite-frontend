import { FC } from 'react';

import { Popover as AntdPopover, PopoverProps } from 'antd';

import 'antd/dist/antd.css';
import './Popover.scss';

const Popover: FC<PopoverProps> = (props) => {
  return (
    <AntdPopover placement="bottom" overlayClassName="popover" {...props}>
      {props.children}
    </AntdPopover>
  );
};

export default Popover;
