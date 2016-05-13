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
  
}

export default alt.createActions(CommentActions);
