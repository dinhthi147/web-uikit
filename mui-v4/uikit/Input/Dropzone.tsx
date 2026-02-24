import React, { memo, useCallback, useMemo, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import KInput from '.';

import { KColors } from '../../constants';
import KContainer from '../Container';
import KImage from '../Image';
import KLabel from '../Label';
import Loading from '../Loading';

interface IProps extends DropzoneOptions {
  onChange?: (files: any[], onSuccess: (returnedFiles: any[]) => void) => void;
  isLoading?: boolean;
  message?: string;
  showFiles?: boolean;
}

const MAX_FILE_SIZE_IN_BYTES = 104857600; // 100MB

const KDropzone = (props: IProps) => {
  const { onChange, isLoading, message: _message, showFiles, ...rest } = props;

  const [files, setFiles] = useState<any[]>([]);
  const [localMessage, setLocalMessage] = useState<string>('');

  const message = useMemo(
    () => _message || localMessage,
    [_message, localMessage]
  );

  const isError = useMemo(() => !!message, [message]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const newFiles = [...files, ...acceptedFiles];
      if (rest.maxFiles && newFiles.length > rest.maxFiles) {
        setLocalMessage(`Max files exceeded: ${rest.maxFiles}`);
        return;
      }
      onChange?.(newFiles, returnedFiles => {
        setFiles(returnedFiles);
      });
    },
    [files, onChange, rest.maxFiles]
  );

  const onRemove = useCallback(
    (item: any) => {
      const newFiles = files.filter(i => i.id !== item.id);
      onChange?.(newFiles, returnedFiles => {
        setFiles(returnedFiles);
      });
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE_IN_BYTES,
    ...rest
  });

  return (
    <>
      <KContainer.View
        width={'100%'}
        br="x"
        brW={1}
        brS="dashed"
        brC={isError ? KColors.secondary.normal : KColors.blue.normal}
        paddingH="1rem"
        paddingV="0.5rem"
        position="relative"
      >
        <div {...getRootProps()}>
          <KInput.TextField {...(getInputProps() as any)} />

          <KContainer.View
            dp="flex"
            center
            width="100%"
            height="100%"
            cursor="pointer"
          >
            <KContainer.View row alignItems marginB="0.5rem">
              <KImage.MuiIcon
                icon="CloudUploadOutlined"
                color={KColors.blue.normal}
                size={70}
              />

              <KLabel.Text
                marginL="0.5rem"
                color={KColors.blue.normal}
                typo="TextMdNormal"
              >
                UPLOAD FILE
              </KLabel.Text>
            </KContainer.View>

            <KLabel.Text color={KColors.blue.normal} typo="TextMdNormal">
              Drag and Drop, or Browse your files
            </KLabel.Text>
          </KContainer.View>

          <KContainer.RenderWhen>
            <KContainer.RenderWhen.If isTrue={showFiles && files.length > 0}>
              <KContainer.View row alignItems flexW="wrap" marginT="0.5rem">
                {files.map(i => {
                  return (
                    <KContainer.View row alignItems key={i.name}>
                      <KContainer.Touchable
                        row
                        alignItems
                        padding="0.25rem"
                        avoidParentPress
                        onPress={() => {
                          if (i?.id && i?.url) {
                            window.open(i.url, '_blank');
                          }
                        }}
                      >
                        <KImage.MuiIcon
                          icon="AttachFileOutlined"
                          size={24}
                          color="#707277"
                        />

                        <KLabel.Text marginH="0.5rem">{i.name}</KLabel.Text>
                      </KContainer.Touchable>

                      <KContainer.Touchable
                        dp="flex"
                        center
                        avoidParentPress
                        onPress={() => onRemove(i)}
                      >
                        <KImage.MuiIcon
                          icon="RemoveCircleOutlineOutlined"
                          size={24}
                          color="#CF0A0A"
                        />
                      </KContainer.Touchable>
                    </KContainer.View>
                  );
                })}
              </KContainer.View>
            </KContainer.RenderWhen.If>
          </KContainer.RenderWhen>
        </div>

        {isLoading && <Loading />}
      </KContainer.View>
    </>
  );
};

export default memo(KDropzone);
