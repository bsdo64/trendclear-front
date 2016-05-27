import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize} from 'normalizr';
import {post, comment, subComment} from './normalizr/schema';

class CommentActions {
  submitComment(params) {
    return (dispatch) => {
      Api
        .setType('/ajax')
        .post('/community/comment', params)
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
        .setType('/ajax')
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
        .setType('/ajax')
        .post('/like/comment/' + commentId)
        .then((res) => {
          dispatch(commentId);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  likeSubComment(subCommentId) {
    return (dispatch) => {
      Api
        .setType('/ajax')
        .post('/like/subComment/' + subCommentId)
        .then((res) => {
          dispatch(subCommentId);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(CommentActions);
