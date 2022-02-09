import { FC, ReactElement } from 'react';

import { Switch as AntdSwitch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';
import cn from 'classnames';

import 'antd/dist/antd.css';
import './Switch.scss';

interface ISwitch extends SwitchProps {
  colorScheme?: 'default';
  switchSize?: 'lg' | 'sm';
  text?: string | ReactElement;
  value?: boolean;
}

const Switch: FC<ISwitch> = ({ colorScheme, switchSize, text, value, ...otherProps }) => {
  return (
    <div className="switch_wrapper">
      <AntdSwitch
        checked={value}
        className={cn(
          'switch',
          `${colorScheme ? `switch-${colorScheme}` : ''}`,
          `${switchSize ? `switch-${switchSize}` : ''}`,
        )}
        {...otherProps}
      />
      {text}
    </div>
  );
};

export default Switch;
