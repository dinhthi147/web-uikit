import 'react-calendar/dist/Calendar.css';
import './style.css';

import React, {
  useState,
  memo,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';
import Calendar, { CalendarProps } from 'react-calendar';

interface KCalendarProps extends Omit<CalendarProps, 'onChange'> {
  onChange?: (d: Date) => void;
  ClickAwayListener?: any;
}

const KCalendar = forwardRef(
  (props: KCalendarProps, ref: React.Ref<{ show: () => void }>) => {
    const { onChange, ClickAwayListener, ...otherProps } = props;

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const show = useCallback(() => {
      setOpen(true);
    }, []);

    const hide = useCallback(() => {
      setOpen(false);
    }, []);

    useImperativeHandle(ref, () => ({
      show
    }));

    const onChangeWrapper = useCallback(
      (d: Date) => {
        setDate(d);
        onChange?.(d);
        hide();
      },
      [hide, onChange]
    );

    const content = useCallback(() => {
      return (
        <div style={styles.wrapper as any}>
          <Calendar
            defaultValue={date}
            defaultView="month"
            minDetail="year"
            onChange={onChangeWrapper as any}
            {...otherProps}
          />
        </div>
      );
    }, [date, onChangeWrapper, otherProps]);

    if (!open) {
      return <></>;
    }

    if (ClickAwayListener) {
      return (
        <ClickAwayListener onClickAway={hide}>{content()}</ClickAwayListener>
      );
    }

    return <>{content()}</>;
  }
);

export default memo(KCalendar);

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    position: 'absolute',
    zIndex: 1000,
    right: 0
  }
};
