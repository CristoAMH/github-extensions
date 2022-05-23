import React, { useState, memo, useEffect } from 'react';

import SummaryCell from './SummaryCell';
import { useTree } from '../context/tree-context';
import { setRecountSortedBy } from '../context/actions';
import useSortRecount from '../hooks/useSortRecount';
import { AZ, ZA } from '../utils/constants';

const Summary = () => {
  const { state: treeState, dispatch: treeDispatch } = useTree();
  const { recount, recountSortedBy } = treeState;

  const [filterString, setFilterString] = useState('');
  const [finalRecount, setFinalRecount] = useState(recount);

  useSortRecount(recountSortedBy, finalRecount, recount, setFinalRecount);
  useEffect(() => {
    setFinalRecount(recount);
  }, [recount]);

  useEffect(() => {
    if (filterString) {
      const newRecount = Object.keys(recount)
        .filter((key) => key.includes(filterString))
        .reduce(
          (acc, key) => ({
            ...acc,
            [key]: +recount[key],
          }),
          {}
        );
      setFinalRecount(newRecount);
    }
  }, [filterString, recount]);

  const onChangeFilter = ({ target: { value } }) => {
    setFilterString(value);
  };

  const setSortedBy = (sort) => {
    treeDispatch(setRecountSortedBy(sort));
  };

  const getRecountKeys = (recountObject) => Object.keys(recountObject);

  if (!getRecountKeys(recount).length) return;

  return (
    <div className='w-full pt-10 '>
      <div className='flex flex-wrap justify-between  mb-2'>
        <input
          value={filterString}
          onChange={onChangeFilter}
          className='bg-slate-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md md:max-w-[50%] self-start'
          placeholder='Filter by name'
          type='text'
          aria-label={`Filter by name - Results: ${
            getRecountKeys(finalRecount)?.length
          }`}
        />
        <div className='flex'>
          <label className='self-end pr-2'>Sorted by:</label>
          <button
            className='bg-zinklar-pale hover:bg-gray-100 text-gray-800  mt-2 md:mt-0 px-3 py-3 border  border-gray-400  rounded-md shadow hover:shadow-md text-xs  disabled:bg-gray-300 disabled:opacity-40 mr-1'
            onClick={() => setSortedBy(AZ)}
            aria-label='sorted by AZ'
          >
            AZ
          </button>
          <button
            className='bg-zinklar-pale hover:bg-gray-100 text-gray-800  mt-2 md:mt-0 px-3 py-3 border  border-gray-400  rounded-md shadow hover:shadow-md text-xs  disabled:bg-gray-300 disabled:opacity-40 '
            onClick={() => setSortedBy(ZA)}
            aria-labelledby='sorted-label'
            aria-label='sorted by ZA'
          >
            ZA
          </button>
        </div>
      </div>
      <div
        className='grid grid-cols-3 md:grid-cols-4 gap-2'
        data-testid='extensions-grid'
      >
        {Object.keys(finalRecount).map((file) => (
          <SummaryCell key={file} extension={file} value={finalRecount[file]} />
        ))}
      </div>
    </div>
  );
};

export default memo(Summary);
