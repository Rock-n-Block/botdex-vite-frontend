import { FC } from 'react';

import { Slider as AntdSlider, SliderSingleProps } from 'antd';

import 'antd/dist/antd.css';
import './Slider.scss';

const Slider: FC<SliderSingleProps> = (props) => {
  return <AntdSlider {...props} className="slider" />;
};

export default Slider;
