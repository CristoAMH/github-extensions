import React from 'react';
import PropTypes from 'prop-types';

const BranchOption = ({ branch, setBranch, isSelected }) => {
  const { name: branchName } = branch;
  return (
    <li
      className={`p-2 w-full ${isSelected ? 'bg-blue-800 text-white' : ''}`}
      role='option'
      aria-selected={isSelected}
    >
      <button className='w-full' onClick={() => setBranch(branch)}>
        {branchName}
      </button>
    </li>
  );
};

BranchOption.propTypes = {
  branch: PropTypes.shape({ name: PropTypes.string.isRequired }),
  setBranch: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default BranchOption;
