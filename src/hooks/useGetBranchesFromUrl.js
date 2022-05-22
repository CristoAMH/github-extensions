import { useEffect } from 'react';
import { setIsFetchingBranchesSuccess } from '../context/actions';
import { getBranchesFromUrl } from '../utils';

const useGetBranchesFromUrl = (userName, repoName, dispatch) => {
  useEffect(() => {
    if (repoName) {
      const getBranches = async function () {
        const branches = await getBranchesFromUrl(userName, repoName, dispatch);
        if (branches) {
          dispatch(setIsFetchingBranchesSuccess(branches));
        }
      };

      getBranches();
    }
  }, [userName, repoName]);
};

export default useGetBranchesFromUrl;
