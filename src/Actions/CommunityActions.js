import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class CommunityActions {
  likePost(postId) {
    return (dispatch) => {
      Api
        .setType('/ajax')
        .post('/like/post/' + postId)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

module.exports = alt.createActions(CommunityActions);
