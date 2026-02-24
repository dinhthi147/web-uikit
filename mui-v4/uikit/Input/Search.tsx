import { useDebounce } from '@dwarvesf/react-hooks';
import InputAdornment from '@mui/material/InputAdornment';
import React, {
  forwardRef,
  memo,
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';

import TextField from './TextField';

import KImage from '../Image';
import { KInputProps } from '../types';

interface KInputSearchProps extends KInputProps {
  initKeyword?: string;
  wait?: number;
}

const KInputSearch = forwardRef((props: KInputSearchProps, ref) => {
  const { initKeyword = '', wait = 800, onChange, ...otherProps } = props;

  const [keyword, setKeyword] = useState(initKeyword);

  const debounceKeyword = useDebounce(keyword, wait);

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      onChange?.({ target: { value: debounceKeyword } } as any);
    }
  }, [debounceKeyword, onChange]);

  const onChangeWrapper = useCallback((e: any) => {
    setKeyword(e.target.value);
  }, []);

  return (
    <TextField
      ref={ref as any}
      name="keyword"
      {...otherProps}
      value={keyword}
      onChange={onChangeWrapper}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <KImage.MuiIcon icon="Search" />
          </InputAdornment>
        )
      }}
    />
  );
});

export default memo(KInputSearch);
