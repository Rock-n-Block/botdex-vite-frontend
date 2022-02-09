import { FC } from 'react';

import { Radio, RadioGroupProps } from 'antd';
import cn from 'classnames';

import 'antd/dist/antd.css';
import './RadioGroup.scss';

interface IRadioGroupItem {
  text: string;
  value: string | number;
}

interface IRadioGroup extends RadioGroupProps {
  items: IRadioGroupItem[];
  className?: string;
  buttonClassName?: string;
}

const { Group, Button } = Radio;

const RadioGroup: FC<IRadioGroup> = ({ items, className, buttonClassName, ...other }) => {
  return (
    <Group {...other} className={cn('r-group', className)}>
      {items.map((item) => (
        <Button key={item.value} value={item.value} className={cn('r-group__btn', buttonClassName)}>
          <span className="r-group__text">{item.text}</span>
        </Button>
      ))}
    </Group>
  );
};

export default RadioGroup;
