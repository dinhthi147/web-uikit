import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useDidUpdate = (effect: EffectCallback, deps?: DependencyList) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidUpdate;
