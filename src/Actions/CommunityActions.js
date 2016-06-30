import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class CommunityActions {
  likePost(postId) {
    return (dispatch) => {
      Api
        .setType('/ajax')
        .post('/like/post/' + postId)
        .then((res) => {
          if (res === 'ok') {
            dispatch(postId);
          } else {
            dispatch(false);
          }
        })
        .catch((err) => {
          return err;
        });
    };
  }

  resetPost() {
    return true;
  }

  resetData() {
    return true;
  }

  createCommunity(category) {
    return (dispatch) => {
      Api
        .setType('/ajax')
        .post('/community/category', category)
        .then((res) => {
          if (res === 'ok') {
            dispatch(res);
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

module.exports = alt.createActions(CommunityActions);
