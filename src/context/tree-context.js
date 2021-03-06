import { useReducer, createContext, useContext } from 'react';
import {
  SET_COUNT,
  SET_COUNT_SORTED_BY,
  TREE_FETCH_ERROR,
  TREE_FETCH_PENDING,
  TREE_FETCH_SUCCESS,
} from './actions';

const defaultTreeState = {
  tree: [],
  isFetchingTree: false,
  count: {},
  countSortedBy: '',
  error: {},
};

export const TreeContext = createContext(defaultTreeState);

const treeReducer = (state = defaultTreeState, action) => {
  switch (action.type) {
    case TREE_FETCH_PENDING:
      return { ...state, isFetchingTree: true };
    case TREE_FETCH_SUCCESS:
      return { ...state, tree: [...action.data], isFetchingTree: false };
    case TREE_FETCH_ERROR:
      return { ...state, error: { ...action.data } };
    case SET_COUNT:
      return { ...state, count: { ...action.data } };
    case SET_COUNT_SORTED_BY:
      return { ...state, countSortedBy: action.data };
    default:
      return state;
  }
};

const TreeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(treeReducer, defaultTreeState);
  /* Me pensaría si memoizar el value si:
/  - El contexto cambia muy amenudo 
/  - Hay muchos componentes haciendo uso del contexto 
/  - Si la aplicación crece y vemos un problema de optimización 
*/
  const value = { state, dispatch };

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

const useTree = () => {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error('useTree must be used within a BranchProvider');
  }
  return context;
};

export { TreeProvider, useTree };
