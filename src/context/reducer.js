import {
  SET_CURRENT_BRANCH,
  BRANCHES_FETCH_ERROR,
  BRANCHES_FETCH_PENDING,
  BRANCHES_FETCH_SUCCESS,
} from './actions';

export const treeReducer = (state = {}, action) => {
  switch (action) {
    case 'TREE_FETCHING_PENDING':
      return { ...state, isFetchingTree: action.data };
    case 'TREE_FETCHING_SUCCESS':
      return { ...state, tree: { ...action.data.tree } };
    case 'TREE_FETCHING_ERROR':
      return { ...state, error: { ...action.data.error } };
    default:
      return state;
  }
};

export const branchReducer = (
  state = { currentBranch: {}, allBranches: [] },
  action
) => {
  switch (action.type) {
    case BRANCHES_FETCH_PENDING:
      return { ...state, isFetchingBranches: true };
    case BRANCHES_FETCH_SUCCESS:
      return {
        ...state,
        allBranches: [...action.data],
        isFetchingBranches: false,
      };
    case BRANCHES_FETCH_ERROR:
      return {
        ...state,
        error: { ...action.data },
        isFetchingBranches: false,
      };
    case SET_CURRENT_BRANCH:
      return { ...state, currentBranch: { ...action.data } };
    default:
      return state;
  }
};
