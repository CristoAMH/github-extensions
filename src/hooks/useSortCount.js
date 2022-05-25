import { useEffect } from 'react';
import { sortRecount } from '../utils';

const useSortRecount = (countSortedBy, finalRecount, setFinalRecount) => {
  useEffect(() => {
    if (countSortedBy) {
      const newRecount = sortRecount(finalRecount, countSortedBy);
      setFinalRecount(newRecount);
    }
  }, [countSortedBy]);
};

export default useSortRecount;
