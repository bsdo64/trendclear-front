import alt from '../Utils/alt';
import Promise from 'bluebird';
import Api from '../Utils/ApiClient';
import { normalize, arrayOf } from 'normalizr';
import { post } from '../Model/normalizr/schema';

class PostActions {
  constructor() {
    this.generateActions('addList', 'setRepresentImage', 'toggleActivateVenalinkModal');
  }

  handleTitle(title) {
    return title;
  }

  handleContent(content) {
    return content;
  }

  selectPrefix(prefixId) {
    return prefixId;
  }

  submitPost(post) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/community/submit', post)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  removeServerInit() {
    return true;
  }

  removeContent() {
    return true;
  }

  getBestPost(data) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .get(data.pathname, data.params)
        .then((res) => {

          res.data = normalize(res.data, arrayOf(post));
          res.listName = data.listName;

          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  getSearchPost(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .get('/search', params)
        .then((res) => {

          res.data = normalize(res.data, arrayOf(post));

          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  getMoreMyPost(params) {
    let url;
    switch (params.type) {
      case 'likePostList':
        url = '/user/likes';
        break;

      case 'myWritePostList':
        url = '/user/posts';
        break;

      case 'myWriteCommentPostList':
        url = '/user/comments';
        break;

      default:
        url = '/user/likes';
    }

    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .get(url, params)
        .then((res) => {

          res.data = normalize(res.data, arrayOf(post));

          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  addImages(data) {
    if (data && data.result && data.result.files[0]) {
      const file = data.result.files[0];
      return { ...file };
    }
  }

  deleteImages(data) {
    if (data && data.deleteUrl) {
      return data;
    }
  }

  getMeta(url) {
    return (dispatch) => {
      Api
        .setEntryPoint('/api')
        .get('/urlMeta', url)
        .then((res) => {

          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  modPost(post) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .put('/community/submit', post)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  removeUnusingImage(list) {
    const ApiList = [];
    for (let index in list) {
      ApiList.push(Api.setEntryPoint('/image').delete('/uploaded/files', { file: list[index].deleteUrl }));
    }
    return (dispatch) => {
      Promise
        .all(ApiList)
        .then(() => {
          return dispatch();
        });
    }
  }

}

export default alt.createActions(PostActions);
