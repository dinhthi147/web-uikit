import { useCallback, useRef } from 'react';

const useRunOnce = (cb: Function, wait?: number) => {
  const hasRun = useRef(false);

  const func = useCallback(() => {
    if (!hasRun.current) {
      cb();
      hasRun.current = true;

      if (wait !== undefined) {
        setTimeout(() => {
          hasRun.current = false;
        }, wait);
      }
    }
  }, [cb, wait]);

  return func;
};

export default useRunOnce;
