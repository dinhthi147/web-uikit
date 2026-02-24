import { CancelablePromise } from 'cancelable-promise';
import { useCallback, useRef } from 'react';

const useCancelablePromise = () => {
  const promise = useRef<CancelablePromise<any> | undefined>(undefined);

  const handleNewPromise = useCallback((newPromise: Promise<any>) => {
    if (promise.current) {
      promise.current.cancel();
    }
    promise.current = new CancelablePromise(async resolve => {
      const data = await newPromise;
      resolve(data);
    });
  }, []);

  return { promise, handleNewPromise };
};

export default useCancelablePromise;
