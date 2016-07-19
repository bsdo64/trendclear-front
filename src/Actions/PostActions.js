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
        .setType('/ajax')
        .post('/community/submit', post)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
  removeContent() {
    return true;
  }
  
  getBestPost(params) {
    return (dispatch) => {
      Api
        .setType('/ajax')
        .get('/best', params)
        .then((res) => {

          res.data = normalize(res.data, arrayOf(post));

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
        .setType('/ajax')
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
        .setType('/ajax')
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

  resetBestPage() {
    return true;
  }
}

export default alt.createActions(PostActions);
