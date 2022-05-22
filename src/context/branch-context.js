import { useReducer, createContext, useContext } from 'react';
import {
  SET_CURRENT_BRANCH,
  BRANCHES_FETCH_ERROR,
  BRANCHES_FETCH_PENDING,
  BRANCHES_FETCH_SUCCESS,
} from './actions';

const defaultBranchState = {
  currentBranch: {},
  allBranches: [],
  isFetchingBranches: false,
};

export const BranchContext = createContext(defaultBranchState);

const branchReducer = (
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

const BranchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(branchReducer, defaultBranchState);
  /* Me pensaría si memoizar el value si:
/  - El contexto cambia muy amenudo 
/  - Hay muchos componentes haciendo uso del contexto 
/  - Si la aplicación crece y vemos un problema de optimización 
*/
  const value = { state, dispatch };

  return (
    <BranchContext.Provider value={value}>{children}</BranchContext.Provider>
  );
};

const useBranch = () => {
  const context = useContext(BranchContext);
  if (context === undefined) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};

export { BranchProvider, useBranch };
