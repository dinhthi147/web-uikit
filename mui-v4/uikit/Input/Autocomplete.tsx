import { useDebounce } from '@dwarvesf/react-hooks';
import { CircularProgress, makeStyles } from '@material-ui/core';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams
} from '@material-ui/lab';
import { isEmpty } from 'lodash';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  useCancelablePromise,
  useCombineRefs,
  useDidUpdate
} from 'uikit-common';

import KTextField from './TextField';

import { KPaging } from '../../constants';
import { useAPIContext } from '../../context/api';
import KButton from '../Button';
import KContainer from '../Container';
import { KInputProps } from '../types';

const useStyles = makeStyles({
  inputRoot: {
    paddingRight: '30px !important',

    '&.Mui-disabled': {
      paddingRight: '8px !important'
    }
  },
  input: {
    minWidth: '20px !important'
  },

  listbox: {
    fontSize: 12
  },
  endAdornment: {
    top: 'calc(50% - 12px)'
  },
  noOptions: {
    fontSize: '12px'
  }
});

interface KAutocompleteProps
  extends Omit<
    AutocompleteProps<
      HTMLInputElement,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined
    >,
    'renderInput' | 'options'
  > {
  options?: any[];
  preOptions?: any[];

  apiURL?: string;
  apiParams?: any;
  apiField?: string;
  isInitFetch?: boolean;
  disabled?: boolean;
  onChange?: any;
  multiple?: boolean;

  hasAddNew?: boolean;
  addNewKey?: string;
  onAddNew?: () => void;
  addNewURL?: string;

  hasEdit?: boolean;
  onEdit?: (v?: any) => void;
  editURL?: string;

  label?: string;
  value?: any;
  name?: string;
  id?: string;

  searchKey?: string;
  inputProps?: KInputProps;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const KAutocomplete = forwardRef((props: KAutocompleteProps, ref) => {
  const classes = useStyles();

  const {
    label,
    value,
    options: mOptions,
    preOptions,

    apiURL,
    apiParams,
    apiField,
    isInitFetch = true,
    disabled,
    onChange,
    multiple = false,

    hasAddNew = false,
    addNewKey = 'name',
    onAddNew,
    addNewURL,

    hasEdit = false,
    editURL,
    onEdit,

    searchKey,
    inputProps,
    ...rest
  } = props;

  const [keyword, setKeyword] = useState('');
  const [options, setOptions] = useState(mOptions || []);
  const [isLoading, setIsLoading] = useState(false);

  const debounceKeyword = useDebounce(keyword, 800);

  const mounted = useRef<boolean>();
  const inputRef = useRef<HTMLInputElement>(null);
  const combinedRef = useCombineRefs<HTMLInputElement>(ref, inputRef);

  const { apiInstance } = useAPIContext();

  const { promise, handleNewPromise } = useCancelablePromise();

  useDidUpdate(() => {
    if (!isEmpty(mOptions)) {
      setOptions(mOptions ?? []);
    }
  }, [JSON.stringify(mOptions)]);

  const fetchData = useCallback(
    async (kw: string = '') => {
      if (apiURL && !disabled && !mOptions) {
        setIsLoading(true);
        handleNewPromise(
          apiInstance({
            url: apiURL,
            body: {
              page: KPaging.page,
              size: KPaging.pageSize,
              status: 'ACTIVE',
              [searchKey || 'keyword']: kw,
              ...(apiParams || {})
            },
            showToast: false
          })
        );
        const { data } = await promise.current;
        if (data) {
          if (typeof apiField === 'string') {
            setOptions((data?.data ?? data ?? []).map((i: any) => i[apiField]));
          } else {
            setOptions(data?.data ?? data);
          }
        }
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      apiInstance,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(apiParams),
      apiURL,
      disabled,
      handleNewPromise,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(mOptions),
      promise,
      searchKey,
      apiField
    ]
  );

  useEffect(() => {
    if (!mounted.current && !isInitFetch) {
      mounted.current = true;
    } else {
      fetchData(debounceKeyword);
    }

    return () => {
      if (promise.current) {
        promise.current.cancel();
      }
    };
  }, [debounceKeyword, fetchData, isInitFetch]);

  const onClear = useCallback(() => {
    setKeyword('');
    onChange?.(multiple ? [] : null);
  }, [onChange, multiple]);

  useImperativeHandle(ref, () => ({
    clear: onClear
  }));

  const _onChange = useCallback(
    (v: any) => {
      if (
        v?.id === 'addNew' ||
        (Array.isArray(v) && v.some(i => i.id === 'addNew'))
      ) {
        onAddNew ? onAddNew() : window.open(`/admin/${addNewURL}`, '_blank');
      } else {
        onChange(v);
      }
    },
    [addNewURL, onAddNew, onChange]
  );

  const _onEdit = useCallback(() => {
    onEdit
      ? onEdit(value)
      : window.open(`/admin/${editURL}/${value?.id}`, '_blank');
  }, [editURL, onEdit, value]);

  const finalOptions = useMemo(() => {
    if (hasAddNew) {
      return [{ id: 'addNew', [addNewKey]: 'Add New' }, ...options];
    }
    if (preOptions) {
      return [...preOptions, ...options];
    }
    return options;
  }, [addNewKey, hasAddNew, options, preOptions]);

  const renderLoading = useMemo(() => {
    return (
      <KContainer.View dp="flex" center width={24} height={24}>
        <CircularProgress color="inherit" size={14} />
      </KContainer.View>
    );
  }, []);

  return (
    <Autocomplete
      classes={{
        inputRoot: classes.inputRoot,
        input: classes.input,
        listbox: classes.listbox,
        endAdornment: classes.endAdornment,
        noOptions: classes.noOptions,
        loading: classes.noOptions
      }}
      openOnFocus
      autoComplete={false}
      getOptionSelected={(o, v) => o.id === v?.id}
      getOptionLabel={o => o?.name ?? ''}
      onChange={(e, v) => _onChange(v)}
      onInputChange={(e, v) => {
        if (v !== 'Add New') {
          setKeyword(v);
        }
      }}
      disableClearable
      filterSelectedOptions={multiple}
      size="small"
      disabled={disabled}
      {...rest}
      multiple={multiple}
      id={rest.id ?? rest.name}
      options={finalOptions as any}
      value={value ?? null}
      blurOnSelect={!hasAddNew}
      renderInput={params => {
        return (
          <KTextField
            {...params}
            {...inputProps}
            ref={combinedRef}
            label={label || ''}
            name={rest.name || ''}
            placeholder={disabled ? undefined : 'Search'}
            size="small"
            InputProps={{
              ...(inputProps?.InputProps ?? {}),
              ...(params?.InputProps ?? {}),
              endAdornment: (
                <KContainer.View row alignItems>
                  {value && !isLoading && !disabled && (
                    <KButton.Icon icon="Close" onPress={onClear} size="sm" />
                  )}

                  {hasEdit && value && !isLoading && !multiple && (
                    <KButton.Icon icon="Edit" onPress={_onEdit} size="sm" />
                  )}

                  {isLoading && !disabled && renderLoading}

                  {!disabled && params.InputProps.endAdornment}
                </KContainer.View>
              )
            }}
          />
        );
      }}
    />
  );
});

export default memo(KAutocomplete);
