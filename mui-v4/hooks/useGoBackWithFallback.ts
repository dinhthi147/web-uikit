import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const useGoBackWithFallback = (fb?: string) => {
  const history = useHistory();
  const prevPage = window.location.href;

  const goBack = useCallback(() => {
    history.go(-1);

    if (fb) {
      setTimeout(() => {
        if (window.location.href == prevPage) {
          history.replace(fb);
        }
      }, 500);
    }
  }, [fb, history, prevPage]);

  return goBack;
};

export { useGoBackWithFallback };
