import { useEffect } from 'react';
import { sortRecount } from '../utils';

const useSortRecount = (recountSortedBy, finalRecount, setFinalRecount) => {
  useEffect(() => {
    if (recountSortedBy) {
      const newRecount = sortRecount(finalRecount, recountSortedBy);
      setFinalRecount(newRecount);
    }
  }, [recountSortedBy, finalRecount]);
};

export default useSortRecount;
