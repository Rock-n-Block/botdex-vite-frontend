import { FC } from 'react';

import { RadioGroup, Search, SortSelect, Switch } from 'components';

import s from './Filter.module.scss';

const Filter: FC = () => {
  return (
    <div className={s.filter_wrapper}>
      <div className={s.switch_wrapper}>
        <Switch
          switchSize="sm"
          text={<span className={s.switch_text}>Staked only</span>}
          onChange={() => {}}
        />
      </div>
      <div className={s.radio_wrapper}>
        <RadioGroup
          className={s.radio}
          buttonStyle="solid"
          defaultValue="live"
          items={[
            {
              text: 'Live',
              value: 'live',
            },
            {
              text: 'Finished',
              value: 'finished',
            },
          ]}
          onChange={() => {}}
        />
      </div>
      <div className={s.sort_wrapper}>
        <SortSelect label="Sort by" className={s.sort} onChange={() => {}} />
        <Search placeholder="Search Farms" className={s.search} realtime onChange={() => {}} />
      </div>
    </div>
  );
};

export default Filter;
