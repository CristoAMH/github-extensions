import React, { memo } from 'react';

import SummaryCell from './SummaryCell';
import { useTree } from '../context/tree-context';

const Summary = () => {
  const { state: treeState } = useTree();
  const { recount } = treeState;
  return (
    <div className='w-full pt-10 '>
      <h2>Tree</h2>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-2'>
        {Object.keys(recount).map((file) => (
          <SummaryCell key={file} extension={file} value={recount[file]} />
        ))}
      </div>
    </div>
  );
};

export default memo(Summary);
