import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Summary from './components/Summary';
import { getFileRecount, getShaFromBranch, getTreeFromSha } from './utils';

function App() {
  const [branch, setBranch] = useState('main');
  const [repo, setRepo] = useState('');
  const [tree, setTree] = useState([]);
  const [fileRecount, setFileRecount] = useState();

  useEffect(() => {
    if (tree.length) {
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

  const changeRepo = ({ target: { value } }) => {
    setRepo(value);
  };

  const changeBranch = ({ target: { value } }) => {
    setBranch(value);
  };

  const getTree = async () => {
    // Deberíamos poner un loadear
    let sha;
    if (branch) {
      sha = await getShaFromBranch(branch);
    }
    if (sha) {
      const tree = await getTreeFromSha(sha);
      setTree(tree);
    }
  };

  return (
    <div className='flex max-w-2xl mx-auto h-screen md:items-center md:justify-center md:p-2xl'>
      <div className='flex flex-col items-center p-8 bg-slate-200 border border-gray-700'>
        <Form
          repo={repo}
          changeRepo={changeRepo}
          branch={branch}
          changeBranch={changeBranch}
          getTree={getTree}
        />
        <Summary recount={fileRecount} />
        {/* {fileRecount ? JSON.stringify(fileRecount) : 'Esperando'} */}
      </div>
    </div>
  );
}

export default App;
