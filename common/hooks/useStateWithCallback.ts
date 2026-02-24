import { useCallback, useEffect, useRef, useState } from 'react';

const useStateWithCallback = <T>(
  init?: T
): [T | undefined, (newV?: T, cb?: any) => void] => {
  const [state, setState] = useState<T | undefined>(init);

  const ref = useRef<any>(null);

  const setStateWithCallback = useCallback((newState?: T, cb?: any) => {
    ref.current = cb;
    setState(newState);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current(state);
      ref.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateWithCallback];
};

export default useStateWithCallback;
