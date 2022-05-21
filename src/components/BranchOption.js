import React from 'react';
import PropTypes from 'prop-types';

const BranchOption = ({ branch, setCurrentBranch, isSelected }) => {
  console.log(branch);
  const { name: branchName } = branch;
  return (
    <li
      className={`p-2 w-full ${isSelected ? 'bg-blue-800 text-white' : ''}`}
      role='option'
      aria-selected={isSelected}
    >
      <button className='w-full' onClick={() => setCurrentBranch(branch)}>
        {branchName}
      </button>
    </li>
  );
};

BranchOption.propTypes = {
  branch: PropTypes.shape({ name: PropTypes.string.isRequired }),
  setCurrentBranch: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default BranchOption;
