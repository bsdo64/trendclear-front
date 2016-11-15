import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class ForumSettingActions {
  constructor() {
    this.generateActions('resetButton', 'changeForumData');
  }

  addForumPrefix(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/forum/prefix', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  updateForumPrefix(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .put('/forum/prefix', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  deleteForumPrefix(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .delete('/forum/prefix', params)
        .then(() => {
          dispatch(params);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  addManager(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/forum/manager', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  removeManager(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .delete('/forum/manager', params)
        .then(() => {
          dispatch(params);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  removeAnnounce(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .delete('/forum/announce', params)
        .then(() => {
          dispatch(params);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  addBanUser(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/forum/banUser', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  removeBanUser(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .delete('/forum/banUser', params)
        .then(() => {
          dispatch(params);
        })
        .catch((err) => {
          return err;
        });
    }
  }
}

export default alt.createActions(ForumSettingActions);
