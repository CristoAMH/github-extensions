import { useEffect } from 'react';
import { sortRecount } from '../utils';

const useSortRecount = (
  recountSortedBy,
  recount,
  finalRecount,
  setFinalRecount
) => {
  useEffect(() => {
    if (recountSortedBy) {
      const newRecount = sortRecount(finalRecount, recountSortedBy);
      setFinalRecount(newRecount);
    }
  }, [recountSortedBy, recount]);
};

export default useSortRecount;
