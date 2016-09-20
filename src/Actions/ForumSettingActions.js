import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {browserHistory} from 'react-router';
import {normalize, arrayOf} from 'normalizr';
import {post, comment, subComment} from '../Model/normalizr/schema';

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
        .then((res) => {
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
}

export default alt.createActions(ForumSettingActions);
