import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize} from 'normalizr';
import {post, comment, subComment} from '../Model/normalizr/schema';

class CommentActions {
  constructor() {
    this.generateActions('addList');
  }
  submitComment(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/community/comment', params)
        .then((res) => {

          let response = normalize(res, post);
          dispatch(response);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  updateComment(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .put('/community/comment', params)
        .then((res) => {

          let response = normalize(res, comment);
          dispatch(response);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  submitSubComment(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/community/subComment', params)
        .then((res) => {

          let response = normalize(res, subComment);
          response.commentId = res.commentId;
          dispatch(response);
        })
        .catch((err) => {
          return err;
        });
    };
  }


  likeComment(commentId) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/like/comment/' + commentId)
        .then((res) => {
          if (res === 'ok') {
            dispatch(commentId);
          } else {
            dispatch(false);
          }
        })
        .catch((err) => {
          return err;
        });
    };
  }

  likeSubComment(subCommentId) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/like/subComment/' + subCommentId)
        .then((res) => {
          if (res === 'ok') {
            dispatch(subCommentId);
          } else {
            dispatch(false);
          }
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(CommentActions);
