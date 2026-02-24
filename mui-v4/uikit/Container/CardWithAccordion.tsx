import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  withStyles
} from '@material-ui/core';
import * as MuiIcons from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, {
  ComponentType,
  CSSProperties,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';

import KCard from './Card';
import KView from './View';

import { KColors } from '../../constants';
import KLabel from '../Label';
import { KCardWithAccordionProps, KSpacing } from '../types';

const Accordion = withStyles({
  root: {
    margin: '0 !important',
    boxShadow: 'none',
    borderRadius: 4,
    paddingBottom: '0.438rem'
  },
  expanded: {
    paddingBottom: 0
  }
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    padding: '0 !important',
    minHeight: '36px !important',
    '& .Mui-expanded': {
      minHeight: 36,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  },
  content: {
    margin: '0 !important'
  },
  expandIcon: {
    marginRight: -12
  }
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: 0,
    display: 'block'
  }
})(MuiAccordionDetails);

const KCardWithAccordion = forwardRef<HTMLDivElement, KCardWithAccordionProps>(
  (props, ref) => {
    const {
      defaultExpanded = true,
      header,
      children,
      size = 'nm',

      cb,

      ...otherProps
    } = props;

    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const executeRef = useRef(false);

    const cardPadding = useMemo(() => {
      let _cardPadding: KSpacing = '1rem';
      switch (size) {
        case 'lg':
          _cardPadding = '1.25rem';
          break;

        case 'nm':
          _cardPadding = '0.75rem';
          break;

        case 'sm':
          _cardPadding = '0.5rem';
          break;

        case 'xs':
          _cardPadding = '0.25rem';
          break;

        default:
          break;
      }
      return _cardPadding;
    }, [size]);

    const renderIcon = useMemo(() => {
      const { icon } = header;
      if (!icon) {
        return null;
      }

      const KIcon = MuiIcons[icon] as ComponentType<{ style?: CSSProperties }>;
      return (
        <KView
          background={KColors.blue.normal}
          br={'x'}
          size={36}
          dp="flex"
          center
          marginR={'1rem'}
          style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))' }}
        >
          <KIcon style={{ color: KColors.white, width: 24, height: 24 }} />
        </KView>
      );
    }, [header]);

    const renderHeader = useMemo(() => {
      const { title, color, renderHeader: _renderHeader } = header;

      if (_renderHeader) {
        return _renderHeader();
      }

      return (
        <KView row alignItems>
          {renderIcon}
          {!!title && (
            <KLabel.Text typo="TextMdMedium" color={color}>
              {title}
            </KLabel.Text>
          )}
        </KView>
      );
    }, [header, renderIcon]);

    const _onChange = useCallback(
      (event: React.ChangeEvent<{}>, expanded: boolean) => {
        if (!executeRef.current && expanded && cb) {
          executeRef.current = true;
          cb();
        }
        setIsExpanded(expanded);
      },
      [cb, executeRef.current]
    );

    return (
      <KCard paddingT={'0.5rem'} paddingB={'0.75rem'} {...otherProps} ref={ref}>
        <Accordion
          TransitionProps={{ unmountOnExit: false }}
          expanded={isExpanded}
          elevation={0}
          style={{ padding: 0 }}
          onChange={_onChange}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ padding: 0, margin: 0 }}
          >
            {renderHeader}
          </AccordionSummary>

          <AccordionDetails style={{ display: 'block', padding: 0 }}>
            <KView marginT={cardPadding} paddingR={cardPadding}>
              {children}
            </KView>
          </AccordionDetails>
        </Accordion>
      </KCard>
    );
  }
);

export default memo(KCardWithAccordion);
