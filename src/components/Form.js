import React from 'react';
import BranchSelector from './BranchSelector';
import Loader from './Loader';
import PropTypes from 'prop-types';
import { useBranch } from '../context/branch-context';
import { useTree } from '../context/tree-context';

const Form = ({ gitRepoUrl, setGitRepoUrl, getTree, userName, repoName }) => {
  const { state: branchState } = useBranch();
  const { state: treeState } = useTree();

  const changeRepoUrl = ({ target: { value } }) => {
    setGitRepoUrl(value);
  };

  return (
    <div className='flex flex-col md:flex-row w-full '>
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
      <BranchSelector />
      <button
        className='bg-zinklar-pale hover:bg-gray-100 text-gray-800  mt-2 md:mt-0 px-5 py-4 border  border-gray-400  rounded-md shadow hover:shadow-md text-xs h-fit self-end disabled:bg-gray-300 disabled:opacity-40 ml-auto'
        onClick={getTree}
        disabled={!userName || !repoName || !branchState.currentBranch?.name}
      >
        {treeState?.isFetchingTree ? <Loader /> : 'GET TREE RECOUNT'}
      </button>
    </div>
  );
};

Form.propTypes = {
  gitRepoUrl: PropTypes.string.isRequired,
  setGitRepoUrl: PropTypes.func.isRequired,
  getTree: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  repoName: PropTypes.string.isRequired,
};

export default Form;
