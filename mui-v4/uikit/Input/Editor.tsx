import { Editor } from '@tinymce/tinymce-react';
// import { AxiosProgressEvent } from 'axios';
import React, {
  ComponentProps,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { EditorEvent, TinyMCE, Editor as TinyMCEEditor } from 'tinymce';

// import { useAPIContext } from '../../context/api';

interface IProps extends ComponentProps<typeof Editor> {
  defaultValue?: string;
  apiURL?: string;
  height?: number;
  imageUploadType?: string;
}

type EditorInit = Parameters<TinyMCE['init']>[0] & {
  selector?: undefined;
  target?: undefined;
};

const TextEditor = (props: IProps, ref: any) => {
  const {
    defaultValue = '',
    // apiURL,
    init,
    height = 500,
    // imageUploadType = 'EDOC',
    onInit,
    onEditorChange,
    ...rest
  } = props;
  const editorRef = useRef<any>(null);

  // const { apiInstance } = useAPIContext();

  const [rawHTML, setRawHTML] = useState(defaultValue || '');

  useEffect(() => {
    setRawHTML(defaultValue);
  }, [defaultValue]);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      return rawHTML;
    },
    getApi: () => {
      return editorRef.current;
    }
  }));

  const _init = useMemo((): EditorInit => {
    return {
      height: height,
      // menubar: false,
      plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'preview',
        'help',
        'wordcount',
        'pagebreak',
        'emoticons',
        'nonbreaking',
        'importcss'
      ],
      toolbar: [
        'fullscreen',
        'undo',
        'redo',
        'blocks',
        'fontfamily',
        'fontsize',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'link',
        'image',
        'forecolor',
        'backcolor',
        'removeformat',
        'alignleft',
        'aligncenter',
        'alignright',
        'alignjustify',
        'bullist',
        'numlist',
        'outdent',
        'indent',
        'pagebreak',
        'help'
      ].join(' | '),
      skin: 'oxide',
      toolbar_mode: 'sliding',
      toolbar_sticky: true,
      content_style: 'body { font-family:Roboto; font-size:12px }',
      promotion: false,
      image_title: true,
      font_size_input_default_unit: 'px',
      font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
      images_reuse_filename: true,
      images_upload_url: '',
      automatic_uploads: true,
      paste_data_images: true,
      // images_upload_url: 'postAcceptor.php',
      // images_upload_handler: (blobInfo, progress) => {
      //   const formData = new FormData();
      //   formData.append('file', blobInfo.blob());
      //   formData.append('resourceType', imageUploadType);

      //   return new Promise(async (resolve, reject) => {
      //     const res = await apiInstance({
      //       url: apiURL || '/resource/upload',
      //       method: 'POST',
      //       body: formData,
      //       showToast: false,
      //       showError: false,
      //       configs: {
      //         headers: {
      //           'Content-Type': 'multipart/form-data'
      //         },
      //         onUploadProgress: p => {
      //           onExternalUploadProgress?.(p);
      //           if (p.total) {
      //             progress((p.loaded / p.total) * 100);
      //           }
      //         }
      //       }
      //     });

      //     if (res.error) {
      //       reject({ message: res.error.message });
      //       return;
      //     }

      //     resolve(res.data.url);
      //   });
      // },
      ...init
    };
  }, [height, init]);

  const _onEditorChange = useCallback(
    (content: string, editor: TinyMCEEditor) => {
      // console.log('Content was updated:', content);
      setRawHTML(content);
      onEditorChange?.(content, editor);
    },
    []
  );

  const _onInit = useCallback((a: EditorEvent<any>, editor: TinyMCEEditor) => {
    editorRef.current = editor;
    onInit?.(a, editor);
  }, []);

  return (
    <Editor
      tinymceScriptSrc={'/tinymce/tinymce.min.js'}
      onInit={_onInit}
      initialValue={defaultValue}
      init={_init}
      onEditorChange={_onEditorChange}
      {...rest}
    />
  );
};

export default memo(forwardRef(TextEditor));
