import React, { memo } from 'react';

import SummaryCell from './SummaryCell';
import { useTree } from '../context/tree-context';
import { setRecount } from '../context/actions';
import { sortRecount } from '../utils';
import { AZ, ZA } from '../utils/constants';

const Summary = () => {
  const { state: treeState, dispatch: treeDispatch } = useTree();
  const { recount } = treeState;

  const setRecountSorted = (recount, sort) => {
    const newRecount = sortRecount(recount, sort);
    treeDispatch(setRecount(newRecount));
  };

  if (!Object.keys(recount).length) return;

  return (
    <div className='w-full pt-10 '>
      <div className='flex justify-end mb-2'>
        <label className='self-end pr-2'>Sorted by:</label>
        <button
          className='bg-zinklar-pale hover:bg-gray-100 text-gray-800  mt-2 md:mt-0 px-3 py-3 border  border-gray-400  rounded-md shadow hover:shadow-md text-xs  disabled:bg-gray-300 disabled:opacity-40 mr-1'
          onClick={() => setRecountSorted(AZ)}
          aria-label='sorted by AZ'
        >
          AZ
        </button>
        <button
          className='bg-zinklar-pale hover:bg-gray-100 text-gray-800  mt-2 md:mt-0 px-3 py-3 border  border-gray-400  rounded-md shadow hover:shadow-md text-xs  disabled:bg-gray-300 disabled:opacity-40 '
          onClick={() => setRecountSorted(ZA)}
          aria-labelledby='sorted-label'
          aria-label='sorted by ZA'
        >
          ZA
        </button>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-2'>
        {Object.keys(recount).map((file) => (
          <SummaryCell key={file} extension={file} value={recount[file]} />
        ))}
      </div>
    </div>
  );
};

export default memo(Summary);
