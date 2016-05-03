import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class UserActions {
  increaseLevel() {
    return true;
  }
  requestLogout() {
    return (dispatch) => {
      Api
        .post('/logout')
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
  openAvatarModalOpen() {
    return true;
  }

  closeAvatarModal() {
    return true;
  }
  uploadAvatarImage(file) {
    return (dispatch) => {
      Api
        .setType('/image')
        .postImg('/upload', file)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(UserActions);
