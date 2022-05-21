import React from 'react';
import PropTypes from 'prop-types';

import SummaryCell from './SummaryCell';

const Summary = ({ recount = {} }) => {
  return (
    <div className='w-full'>
      <h2>Tree</h2>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-2'>
        {Object.keys(recount).map((file) => (
          <SummaryCell key={file} extension={file} value={recount[file]} />
        ))}
      </div>
    </div>
  );
};

Summary.propTypes = {
  recount: PropTypes.shape(PropTypes.objectOf(PropTypes.number)),
};

export default Summary;
