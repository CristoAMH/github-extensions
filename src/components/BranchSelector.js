import React, { useState } from 'react';
import BranchOption from './BranchOption';
import Loader from './Loader';
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
            <span className='mr-3'>
              <Loader />
            </span>
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

export default BranchSelector;
