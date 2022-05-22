import React, { useState } from 'react';
import BranchOption from './BranchOption';
import PropTypes from 'prop-types';
import { setCurrentBranch } from '../context/actions';
import { useBranch } from '../context/branch-context';

const BranchSelector = () => {
  const { state: branchState, dispatch: branchDispatch } = useBranch();
  const { currentBranch, allBranches, isFetchingBranches } = branchState;
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const setBranch = (branch) => {
    branchDispatch(setCurrentBranch(branch));
  };

  return (
    <div className='flex flex-col justify-end md:pr-4'>
      <div className='relative'>
        <button
          className='text-white bg-slate-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-4 py-2.5 text-center flex items-center w-full md:max-w-[10rem] rounded-b-md md:rounded-bl-none  md:rounded-r-md '
          type='button'
          onClick={toggleMenu}
          role='combobox'
          aria-controls='branches-dropdown'
          aria-expanded={isOpen}
        >
          {isFetchingBranches && (
            <svg class='animate-spin h-5 w-5 mr-3 ' viewBox='0 0 24 24'>
              <circle
                class='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                stroke-width='4'
              ></circle>
              <path
                class='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          )}
          <span className='truncate'>{currentBranch?.name || 'Branch'} </span>
          <svg
            className='w-4 h-4 ml-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </button>
        <ul
          className={`${
            isOpen ? '' : 'hidden'
          }  bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow absolute min-w-max`}
          id='branches-dropdown'
          role='listbox'
        >
          {!!allBranches?.length &&
            allBranches.map((branch) => (
              <BranchOption
                key={branch.name}
                isSelected={branch.name === currentBranch.name}
                setBranch={setBranch}
                branch={branch}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

BranchOption.propTypes = {
  currentBranch: PropTypes.shape({ name: PropTypes.string.isRequired }),
  setCurrentBranch: PropTypes.func.isRequired,
  allBranches: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ),
};

export default BranchSelector;
