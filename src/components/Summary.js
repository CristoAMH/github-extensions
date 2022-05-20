import React from 'react';
import SummaryCell from './SummaryCell';

const mockedRecount = {
  js: 2,
  md: 3,
  ts: 5,
  tsx: 12,
  css: 1,
  config: 3,
  //   js2: 2,
  //   md2: 3,
  //   ts2: 5,
  //   tsx2: 12,
  //   css2: 1,
  //   config2: 3,
};

const Summary = ({ recount = mockedRecount }) => {
  return (
    <div className='w-full'>
      <h2>Tree</h2>
      <div className='grid grid-cols-3 gap-2'>
        {Object.keys(recount).map((file) => (
          <SummaryCell extension={file} value={recount[file]} />
        ))}
      </div>
    </div>
  );
};

export default Summary;
