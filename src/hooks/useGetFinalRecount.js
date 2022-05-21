import { useState, useEffect } from 'react';
import { getFileRecount } from '../utils';

const useGetFinalRecount = (tree) => {
  const [filesRecount, setFilesRecount] = useState();

  useEffect(() => {
    if (tree?.length) {
      const getFinalRecount = async function () {
        const finalRecount = await getFileRecount({ tree });
        console.log(finalRecount);
        if (finalRecount) {
          setFilesRecount(finalRecount);
        }
      };

      getFinalRecount();
    }
  }, [tree]);

  return [filesRecount];
};

export default useGetFinalRecount;
