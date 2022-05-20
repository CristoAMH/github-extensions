import React from 'react';
import BranchSelector from './BranchSelector';
import './form.css';

const Form = ({
  gitRepoUrl,
  changeRepoUrl,
  currentBranch,
  setCurrentBranch,
  allBranches,
  getTree,
}) => {
  return (
    <div className='flex flex-col md:flex-row pb-20 w-full'>
      <div className='flex flex-col'>
        <label htmlFor='change-repo-input'>Github Repository URL</label>
        <input
          id='change-repo-input'
          value={gitRepoUrl}
          onChange={changeRepoUrl}
          type='text'
          className='bg-slate-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
        className='bg-green-100 hover:bg-gray-100 text-gray-800 font-semibold py-2.5 mt-2 md:mt-0 px-4 border rounded-none border-gray-400 rounded shadow'
        onClick={getTree}
      >
        Get tree
      </button>
    </div>
  );
};

export default Form;
