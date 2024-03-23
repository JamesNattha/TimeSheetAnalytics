import { useMemo } from 'react';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import makeData from 'data/react-table';
import ReactTable from 'components/ReactTableUC';
import { rowColumn } from './row-column';

// ==============================|| REACT TABLE - ROW SELECTION ||============================== //

const RowSelectionTable = () => {
  const data = useMemo(() => makeData(1000), []);
  console.log(data);
  

  return (
    <MainCard content={false} title="Row Selection (Pagination)">
      <ScrollX>
        <ReactTable columns={rowColumn} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default RowSelectionTable;
