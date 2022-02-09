import { FC, memo } from 'react';

// import { Farm } from 'types';
import TableRow from '../TableRow';

import s from './Table.module.scss';

// interface ITableProps {
//   data: Farm[];
// }

const Table: FC = memo(() => {
  return (
    <div className={s.farms_table}>
      <div className={s.farms_table__head}>
        <div />
        <div className="text-ssm text-gray-2">Earned</div>
        <div className="text-bold farms-table--apr">APR</div>
        <div className="text-bold farms-table--liquidity">Liquidity</div>
        <div className="text-bold farms-table--multiplier">Multiplier</div>
      </div>
      <TableRow />
      {/* {data.map((farm) => { */}
      {/*  return <TableRow key={farm.pid} farm={farm} />; */}
      {/* })} */}
    </div>
  );
});

export default Table;
