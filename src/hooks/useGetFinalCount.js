import { useEffect } from 'react';
import { setCount } from '../context/actions';
import { getFilesExtensionsCount } from '../utils';

const useGetFinalCount = (tree, dispatch) => {
  useEffect(() => {
    if (tree?.length) {
      const getFinalRecount = async function () {
        const finalCount = await getFilesExtensionsCount({ tree });

        if (finalCount) {
          dispatch(setCount(finalCount));
        }
      };

      getFinalRecount();
    }
  }, [tree]);
};

export default useGetFinalCount;
