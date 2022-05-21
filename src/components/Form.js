import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';
import BranchSelector from './BranchSelector';

const Form = ({
  gitRepoUrl,
  changeRepoUrl,
  currentBranch,
  setCurrentBranch,
  allBranches,
  getTree,
  user,
  repo,
}) => {
  return (
    <div className='flex flex-col md:flex-row pb-20 w-full '>
      <div className='flex flex-col w-full '>
        <label htmlFor='change-repo-input'>Github Repository URL</label>
        <input
          id='change-repo-input'
          value={gitRepoUrl}
          onChange={changeRepoUrl}
          type='text'
          className='bg-slate-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-t-md  md:rounded-tr-none  md:rounded-l-md '
          placeholder='Repository URL'
          required
        />
      </div>
      <BranchSelector
        allBranches={allBranches}
        currentBranch={currentBranch}
        setCurrentBranch={setCurrentBranch}
      />
      <button
        className='bg-zinklar-pale hover:bg-gray-100 text-gray-800  mt-2 md:mt-0 px-5 py-4 border  border-gray-400  rounded-md shadow hover:shadow-md text-xs h-fit self-end disabled:bg-gray-300 disabled:opacity-40 ml-auto'
        onClick={getTree}
        disabled={!user || !repo || !currentBranch}
      >
        GET TREE
      </button>
    </div>
  );
};

export default Form;
