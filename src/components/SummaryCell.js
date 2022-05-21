import React from 'react';

const SummaryCell = ({ extension, value }) => {
  return (
    <div className='px-8 py-16 text-center bg-slate-50 border border-gray-700 text-xl rounded-md bg-zin'>
      <span className='font-bold'>{extension}</span>
      <div className='text-4xl'>{value}</div>
    </div>
  );
};

export default SummaryCell;
