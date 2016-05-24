/**
 * Created by dobyeongsu on 2016. 2. 7..
 */

const medium = {
  placeholder: {
    text: '텍스트를 입력하세요',
    hideOnClick: true
  },
  imageDragging: false,
  autoLink: true,
  toolbar: {
    buttons: [
      'bold',
      'italic',
      'underline',
      'anchor',
      'h2',
      'h3',
      'quote',
      {
        name: 'justifyFull',
        contentDefault: '<i class="fa fa-align-justify"></i>'
      },
      {
        name: 'justifyLeft',
        contentDefault: '<i class="fa fa-align-left"></i>'
      },
      {
        name: 'justifyCenter',
        contentDefault: '<i class="fa fa-align-center"></i>'
      },
      {
        name: 'justifyRight',
        contentDefault: '<i class="fa fa-align-right"></i>'
      }
    ]
  }
};

const mediumInsertConfig = function mediumInsertConfig(editor) {
  return {
    editor: editor,
    addons: {
      images: {
        deleteScript: '/image/uploaded/files/',
        deleteMethod: 'DELETE',
        preview: false,
        captions: true,
        captionPlaceholder: '이미지 캡션을 입력하세요',
        fileUploadOptions: {
          url: 'http://localhost:3000/image/upload',
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
          maxFileSize: 5 * 1024 * 1024
        },
        messages: {
          acceptFileTypesError: '지원되지 않는 파일 형식 입니다: ',
          maxFileSizeError: '파일의 크기가 큽니다 (5MB 이하): '
        }
      },
      embeds: {
        oembedProxy: '/api/oembed?iframe=1'
      }
    }
  };
};

export {medium, mediumInsertConfig};
