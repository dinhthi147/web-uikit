import { makeStyles } from '@material-ui/core/styles';
import React, { memo, useMemo } from 'react';

import KView from './View';

import { KColors } from '../../constants';
import KLabel from '../Label';
import { KFieldsetProps } from '../types';

const useStyles = makeStyles({
  title: {
    position: 'absolute',
    top: -10,
    left: 4,
    background: 'white',
    paddingLeft: 4,
    paddingRight: 4
  }
});

const Fieldset = (props: KFieldsetProps) => {
  const classes = useStyles();

  const {
    renderHeader: _renderHeader,
    title,
    required,
    error,
    children,
    ...rest
  } = props;

  //   return (
  //     <fieldset className={classes.fieldset}>
  //       {!!title && <legend className={classes.legend}>{title}</legend>}

  //       {children}
  //     </fieldset>
  //   );
  const renderHeader = useMemo(() => {
    if (_renderHeader) {
      return _renderHeader();
    }

    if (title) {
      return (
        <KLabel.Text
          typo="TextXsMedium"
          className={classes.title}
          color={error ? KColors.secondary.normal : KColors.black}
        >
          {title}
          {required && (
            <KLabel.Text color={KColors.secondary.normal}> *</KLabel.Text>
          )}
        </KLabel.Text>
      );
    }

    return null;
  }, [_renderHeader, classes.title, error, required, title]);

  return (
    <KView
      minH={32.25}
      brW={1}
      brC={error ? KColors.secondary.normal : KColors.palette.gray.w100}
      marginT="0.75rem"
      br="x"
      paddingT="0.75rem"
      {...rest}
      position="relative"
      padding="0.5rem"
    >
      {renderHeader}

      {children}
    </KView>
  );
};

export default memo(Fieldset);
