import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize, arrayOf} from 'normalizr';
import {post, comment, subComment} from '../Model/normalizr/schema';

class PostActions {
  constructor() {
    this.generateActions('addList');
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

  getMeta(url) {
    return (dispatch) => {
      Api
        .setEntryPoint('/api')
        .get('/urlMeta', {url: url})
        .then((res) => {

          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(PostActions);
