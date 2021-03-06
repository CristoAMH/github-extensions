import {
  setIsFetchingBranchesError,
  setIsFetchingBranchesPending,
  setIsFetchingTreePending,
  setIsFetchingTreeSuccess,
  setIsFetchingTreeError,
} from '../context/actions';
import { AZ, BLOB, TREE, ZA } from './constants';

export const getRepoTree = async ({ userName, repoName, sha, dispatch }) => {
  // Los archivos tienen un tipo blob si es un directorio es tipo tree
  // Lost tipo tree tienen un url para acceder a su tree y así consecutivamente

  try {
    dispatch(setIsFetchingTreePending());
    const getTree = await fetch(
      `https://api.github.com/repos/${userName}/${repoName}/git/trees/${sha}`
    );
    const getTreeJson = await getTree.json();

    dispatch(setIsFetchingTreeSuccess(getTreeJson.tree));
  } catch (e) {
    dispatch(setIsFetchingTreeError(e));
  }
};

const getExtensionsCountFromTree = async ({ url, tree, recount = {} }) => {
  if (url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    tree = responseJson.tree;
  }

  for (const el of tree) {
    const extension = el.path.split('.').pop();

    if (el.type === BLOB)
      recount[extension] = recount[extension] ? recount[extension] + 1 : 1;
    if (el.type === TREE)
      await getExtensionsCountFromTree({ url: el.url, recount });
  }
  return recount;
};

export const getFilesExtensionsCount = async ({ url, tree }) => {
  if (!url && !tree) return;
  const recount = await getExtensionsCountFromTree({ url, tree });
  return recount;
};

export const getBranchesFromUrl = async (
  owner = 'argoproj',
  repo = 'argo-site',
  dispatch
) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/branches `;

  try {
    dispatch(setIsFetchingBranchesPending());
    const branchesResponse = await fetch(url);
    const responseFormatted = await branchesResponse.json();

    if (branchesResponse.status === 403) {
      dispatch(setIsFetchingBranchesError(responseFormatted));
      return [];
    }

    if (branchesResponse.status === 404) {
      dispatch(setIsFetchingBranchesError(responseFormatted));
      return [];
    }

    return responseFormatted;
  } catch (e) {
    dispatch(setIsFetchingBranchesError(e));
  }
};

export const isValidGitUrl = (url) => {
  var validGithubUrlRegex =
    /(?:git@|https:\/\/)github.com[:/](?<gitUser>.+?(?=\/))\/(?<gitRepo>.+?(?=\/|$))/;
  return url.match(validGithubUrlRegex);
};

export const sortRecount = (recount, sort) => {
  if (!recount) return;
  if (!sort) return recount;
  let newRecount;
  if (sort === AZ) {
    newRecount = Object.keys(recount).sort();
  }
  if (sort === ZA) {
    newRecount = Object.keys(recount).reverse();
  }
  if (newRecount) {
    return newRecount.reduce(
      (acc, key) => ({
        ...acc,
        [key]: recount[key],
      }),
      {}
    );
  }
};
