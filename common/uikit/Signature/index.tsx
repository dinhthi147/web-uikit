import React, { forwardRef, memo } from 'react';
import SignaturePad, {
  ReactSignatureCanvasProps
} from 'react-signature-canvas';

export { SignaturePad };

interface IProps extends ReactSignatureCanvasProps {
  isSignEnabled?: boolean;
}

const KSignature = forwardRef<SignaturePad, IProps>((props, ref) => {
  const { isSignEnabled, ...rest } = props;

  return (
    <div
      style={{
        ...(styles.wrapper as any),
        ...(!isSignEnabled ? styles.disabled : undefined)
      }}
    >
      {/* @ts-ignore */}
      <SignaturePad ref={ref} penColor="green" {...rest} />
    </div>
  );
});

export default memo(KSignature);

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    height: 186,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6'
  },
  disabled: {
    pointerEvents: 'none'
  }
};
