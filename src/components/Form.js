import React from 'react';
import './form.css';

const Form = ({ repo, changeRepo, branch, changeBranch, getTree }) => {
  return (
    <div className='flex flex-col md:flex-row pb-20 w-full'>
      <div className='flex flex-col'>
        <label htmlFor='change-repo-input'>Github Repository URL</label>
        <input
          id='change-repo-input'
          value={repo}
          onChange={changeRepo}
          type='text'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search'
          required
        />
      </div>
      {/* El de las branches probablemente tenga que ser un desplegable con las branches seleccionadas */}
      <div className='flex flex-col md:pr-4'>
        <label htmlFor='change-branch-input'>Change branch</label>
        <input
          id='change-branch-input'
          value={branch}
          onChange={changeBranch}
          type='text'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search'
          required
        />
      </div>
      <button
        className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2.5 mt-2 md:mt-0 px-4 border border-gray-400 rounded shadow'
        onClick={getTree}
      >
        Get tree
      </button>
    </div>
  );
};

export default Form;
