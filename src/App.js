import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Summary from './components/Summary';
import {
  getBranchesFromRepo,
  getFileRecount,
  getRepoTree,
  isValidGitUrl,
} from './utils';

function App() {
  const [currentBranch, setCurrentBranch] = useState('');
  const [allBranches, setAllBranches] = useState([]);
  const [gitRepoUrl, setGitRepoUrl] = useState('');
  const [repo, setRepo] = useState('');
  const [user, setUser] = useState('');
  const [tree, setTree] = useState([]);
  const [fileRecount, setFileRecount] = useState();

  useEffect(() => {
    if (tree?.length) {
      const getFinalRecount = async function () {
        const finalRecount = await getFileRecount({ tree });
        console.log(finalRecount);
        if (finalRecount) {
          setFileRecount(finalRecount);
        }
      };

      getFinalRecount();
    }
  }, [tree]);

  useEffect(() => {
    // Coger el usuario y el repo
    if (gitRepoUrl) {
      const match = isValidGitUrl(gitRepoUrl);
      if (match) {
        setUser(match.groups.gitUser);
        setRepo(match.groups.gitRepo);
      }
    }
  }, [gitRepoUrl]);

  useEffect(() => {
    // Coger el usuario y el repo
    // Si tiene /tree coger el branch tambien
    if (repo) {
      const getBranches = async function () {
        const branches = await getBranchesFromRepo(user, repo);
        if (branches) {
          setAllBranches(branches);
        }
      };

      getBranches();
    }
  }, [repo, user]);

  const changeRepoUrl = ({ target: { value } }) => {
    setGitRepoUrl(value);
  };

  const getTree = async () => {
    // Deberíamos poner un loadear
    let sha;
    if (currentBranch) {
      sha = currentBranch.commit?.sha;
    }
    if (sha) {
      const tree = await getRepoTree({ user, repo, sha });
      setTree(tree);
    }
  };

  return (
    <div className='bg'>
      <div className='flex max-w-4xl mx-auto min-h-screen h-full items-center justify-center md:p-2xl font-roboto'>
        <div className='flex flex-col items-center p-8 bg-slate-200 border rounded-md border-gray-700 h-full'>
          <Form
            gitRepoUrl={gitRepoUrl}
            changeRepoUrl={changeRepoUrl}
            currentBranch={currentBranch}
            setCurrentBranch={setCurrentBranch}
            getTree={getTree}
            allBranches={allBranches}
            user={user}
            repo={repo}
          />
          <Summary recount={fileRecount} />
          {/* {fileRecount ? JSON.stringify(fileRecount) : 'Esperando'} */}
        </div>
      </div>
    </div>
  );
}

export default App;
