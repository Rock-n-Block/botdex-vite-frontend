import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { Button, Input, Modal, RadioGroup, Switch } from 'components';
import { checkValueDecimals } from 'utils';

import { IModalProps } from 'types';

import { ArrowLgImg, ExchangeImg } from 'assets/img';

import s from './RoiModal.module.scss';

const RoiModal: FC<IModalProps> = observer(({ visible, onClose }) => {
  const [amount, setAmount] = useState('0');
  const [roi, setRoi] = useState('0');

  const amountOptions = useMemo(
    () => [
      { value: '100', label: '$100' },
      { value: '1000', label: '$1000' },
      { value: '10000', label: 'My Balance' },
    ],
    [],
  );

  const periodOptions = useMemo(
    () => [
      { value: 'day', text: '1D' },
      { value: 'week', text: '7D' },
      { value: 'month', text: '30D' },
      { value: 'year', text: '1Y' },
      { value: 'fiveYears', text: '5Y' },
    ],
    [],
  );
  const compoundingOptions = useMemo(
    () => [
      { value: 'day', text: '1D' },
      { value: 'week', text: '7D' },
      { value: 'twoWeeks', text: '14D' },
      { value: 'month', text: '30D' },
    ],
    [],
  );
  const handleChangeAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value;
    if (!e.target.value) {
      value = '0';
    } else {
      value = checkValueDecimals(parseInt(e.target.value, 10).toString(), 18);
    }
    setAmount(value);
  }, []);
  const handleChangeRoi = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value;
    if (!e.target.value) {
      value = '0';
    } else {
      value = checkValueDecimals(parseInt(e.target.value, 10).toString(), 18);
    }
    setRoi(value);
  }, []);

  return (
    <Modal title="ROI Calculator" visible={visible} onClose={onClose} className={s.roi_modal}>
      <div className={s.roi_modal_content}>
        <div className={s.title}>DAI-WBNB LP STAKED</div>
        <Input
          value={amount}
          positiveOnly
          isNumber
          className={s.lp_input}
          onChange={handleChangeAmount}
          postfix={
            <Button size="sm" className={s.lp_input_postfix} color="outline" onClick={() => {}}>
              <img src={ExchangeImg} alt="exchange" />
            </Button>
          }
          prefix={
            <div className={s.lp_input_prefix}>
              <span className="text-lmd">~0.0 DAI-WBNB LP</span>
            </div>
          }
        />
        <div className={s.amounts_wrapper}>
          {amountOptions.map((option) => (
            <Button key={option.label} size="sm" color="pink" onClick={() => {}}>
              {option.label}
            </Button>
          ))}
        </div>
        <div className={s.title}>Staked For</div>
        <RadioGroup
          className={s.stake_time}
          buttonStyle="solid"
          defaultValue={periodOptions[3].value}
          items={periodOptions}
          onChange={() => {}}
        />
        <div className={s.title}>COMPOUNDING EVERY</div>
        <div className={s.compounding_wrapper}>
          <Switch switchSize="sm" defaultChecked onChange={() => {}} />
          <RadioGroup
            className={s.compounding}
            buttonStyle="solid"
            defaultValue={compoundingOptions[0].value}
            items={compoundingOptions}
            onChange={() => {}}
          />
        </div>
        <div className={s.arrow_wrapper}>
          <img src={ArrowLgImg} alt="arrow" />
        </div>
        <div className={s.title}>ROI AT CURRENT RATES</div>
        <Input
          value={roi}
          positiveOnly
          isNumber
          className={s.lp_input}
          onChange={handleChangeRoi}
          prefix={
            <div className={s.stake__postfix}>
              <span className="text-lmd">~0 BOT (0.00%)</span>
            </div>
          }
        />
      </div>
    </Modal>
  );
});

export default RoiModal;
