export const SET_CURRENT_BRANCH = 'SET_CURRENT_BRANCH';
export const BRANCHES_FETCH_PENDING = 'BRANCHES_FETCH_PENDING';
export const BRANCHES_FETCH_SUCCESS = 'BRANCHES_FETCH_SUCCESS';
export const BRANCHES_FETCH_ERROR = 'BRANCHES_FETCH_ERROR';

export const TREE_FETCH_PENDING = 'TREE_FETCH_PENDING';
export const TREE_FETCH_SUCCESS = 'TREE_FETCH_SUCCESS';
export const TREE_FETCH_ERROR = 'TREE_FETCH_ERROR';
export const SET_COUNT = 'SET_COUNT';
export const SET_COUNT_SORTED_BY = 'SET_COUNT_SORTED_BY';

export const setCurrentBranch = (currentBranch) => ({
  type: SET_CURRENT_BRANCH,
  data: currentBranch,
});

export const setIsFetchingBranchesPending = () => ({
  type: BRANCHES_FETCH_PENDING,
});

export const setIsFetchingBranchesSuccess = (branches) => ({
  type: BRANCHES_FETCH_SUCCESS,
  data: branches,
});

export const setIsFetchingBranchesError = (error) => ({
  type: BRANCHES_FETCH_ERROR,
  data: error,
});

export const setIsFetchingTreePending = () => ({
  type: TREE_FETCH_PENDING,
});

export const setIsFetchingTreeSuccess = (tree) => ({
  type: TREE_FETCH_SUCCESS,
  data: tree,
});

export const setIsFetchingTreeError = () => ({
  type: TREE_FETCH_ERROR,
});

export const setCount = (count) => ({
  type: SET_COUNT,
  data: count,
});

export const setRecountSortedBy = (sort) => ({
  type: SET_COUNT_SORTED_BY,
  data: sort,
});
