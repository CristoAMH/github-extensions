import { useState } from 'react';
import Form from './components/Form';
import Summary from './components/Summary';
import useGetBranchesFromUrl from './hooks/useGetBranchesFromUrl';
import useGetFinalRecount from './hooks/useGetFinalRecount';
import useGetUserAndRepoFromUrl from './hooks/useGetUserAndRepoFromUrl';
import { getRepoTree } from './utils';

import './App.css';

function App() {
  const [currentBranch, setCurrentBranch] = useState({});
  const [gitRepoUrl, setGitRepoUrl] = useState('');
  const [tree, setTree] = useState([]);

  const [userName, repoName] = useGetUserAndRepoFromUrl(gitRepoUrl);
  const [allBranches] = useGetBranchesFromUrl(userName, repoName);
  const [filesRecount] = useGetFinalRecount(tree);

  const getTree = async () => {
    // Deberíamos poner un loadear
    let sha;
    if (currentBranch) {
      sha = currentBranch.commit?.sha;
    }
    if (sha) {
      const tree = await getRepoTree({ userName, repoName, sha });
      setTree(tree);
    }
  };

  return (
    <div className='bg'>
      <div className='flex max-w-4xl mx-auto min-h-screen h-full items-center justify-center md:p-2xl font-roboto'>
        <div className='flex flex-col items-center p-8 bg-slate-200 border rounded-md border-gray-700 h-full'>
          <Form
            gitRepoUrl={gitRepoUrl}
            setGitRepoUrl={setGitRepoUrl}
            currentBranch={currentBranch}
            setCurrentBranch={setCurrentBranch}
            getTree={getTree}
            allBranches={allBranches}
            userName={userName}
            repoName={repoName}
          />
          <Summary recount={filesRecount} />
        </div>
      </div>
    </div>
  );
}

export default App;
