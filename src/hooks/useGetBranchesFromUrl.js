import { useState, useEffect } from 'react';
import { getBranchesFromUrl } from '../utils';

const useGetBranchesFromUrl = (userName, repoName) => {
  const [allBranches, setAllBranches] = useState([]);

  useEffect(() => {
    if (repoName) {
      const getBranches = async function () {
        const branches = await getBranchesFromUrl(userName, repoName);
        if (branches) {
          setAllBranches(branches);
        }
      };

      getBranches();
    }
  }, [userName, repoName]);

  return [allBranches];
};

export default useGetBranchesFromUrl;
