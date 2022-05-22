import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SummaryCell = ({ extension, value }) => {
  return (
    <div className='px-8 py-16 text-center bg-slate-50 border border-gray-700 text-xl rounded-md bg-zin'>
      <div className='font-bold'>
        {extension}
        <div className='text-4xl'>{value}</div>
      </div>
    </div>
  );
};

SummaryCell.propTypes = {
  extension: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default memo(SummaryCell);
