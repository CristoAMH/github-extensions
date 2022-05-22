import { useState, useEffect, useContext } from 'react';
import { BranchContext } from '../App';
import { setIsFetchingBranchesSuccess } from '../context/actions';
import { getBranchesFromUrl } from '../utils';

const useGetBranchesFromUrl = (userName, repoName, dispatch) => {
  useEffect(() => {
    if (repoName) {
      const getBranches = async function () {
        const branches = await getBranchesFromUrl(userName, repoName, dispatch);
        if (branches) {
          console.log(branches);
          dispatch(setIsFetchingBranchesSuccess(branches));
        }
      };

      getBranches();
    }
  }, [userName, repoName]);
};

export default useGetBranchesFromUrl;
