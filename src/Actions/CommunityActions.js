import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class CommunityActions {
  likePost(postId) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
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

  triggerUpdate(targetObj) {
    return targetObj;
  }

  closeUpdateComment() {
    return true;
  }
}

module.exports = alt.createActions(CommunityActions);
