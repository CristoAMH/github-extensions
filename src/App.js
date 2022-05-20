import { useState, useEffect } from 'react';
import './App.css';
import { getFileRecount, getShaFromBranch, getTreeFromSha } from './utils';

function App() {
  const [branch, setBranch] = useState('main');
  const [repo, setRepo] = useState('');
  const [tree, setTree] = useState([]);
  const [fileRecount, setFileRecount] = useState({});

  useEffect(() => {
    if (tree.length) {
      let recount = {};
      const getFinalRecount = async function () {
        const finalRecount = await getFileRecount({ tree, recount });
        console.log(recount);
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
    <div className='App'>
      <div className='form'>
        <label htmlFor='change-repo-input'>Change Repo URL</label>
        <input id='change-repo-input' value={repo} onChange={changeRepo} />
        <span>{repo}</span>
        {/* El de las branches probablemente tenga que ser un desplegable con las branches seleccionadas */}
        <label htmlFor='change-branch-input'>Change branch</label>
        <input
          id='change-branch-input'
          value={branch}
          onChange={changeBranch}
        />
        <span>{branch}</span>
        <button onClick={getTree}>Get tree</button>
      </div>
      <div>
        <h2>Tree</h2>
        <div>
          {tree.map((file) => (
            <div>{file.path}</div>
          ))}
        </div>
      </div>
      {fileRecount ? JSON.stringify(fileRecount) : 'Esperando'}
    </div>
  );
}

export default App;
