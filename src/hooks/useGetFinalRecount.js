import { useEffect } from 'react';
import { setRecount } from '../context/actions';
import { getFileRecount } from '../utils';

const useGetFinalRecount = (tree, dispatch) => {
  useEffect(() => {
    if (tree?.length) {
      const getFinalRecount = async function () {
        const finalRecount = await getFileRecount({ tree });

        if (finalRecount) {
          dispatch(setRecount(finalRecount));
        }
      };

      getFinalRecount();
    }
  }, [tree]);
};

export default useGetFinalRecount;
