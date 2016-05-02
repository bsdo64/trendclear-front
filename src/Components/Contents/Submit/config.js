/**
 * Created by dobyeongsu on 2016. 2. 7..
 */

const medium = {
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
        deleteScript: '/image/files/',
        deleteMethod: 'DELETE',
        preview: true,
        captions: true,
        captionPlaceholder: '이미지 캡션을 입력하세요(옵션)',
        fileUploadOptions: {
          url: 'http://localhost:3000/image',
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        }
      },
      embeds: {
        oembedProxy: '/api/oembed?iframe=1'
      }
    }
  };
};

export {medium, mediumInsertConfig};
