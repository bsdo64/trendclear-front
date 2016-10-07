import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {browserHistory} from 'react-router';
import {normalize, arrayOf} from 'normalizr';
import {forum} from '../Model/normalizr/schema';

class ForumActions {
  constructor() {
    this.generateActions('addList');
  }

  createForum(params) {
    Api
      .setEntryPoint('/ajax')
      .post('/forum', params)
      .then((forum) => {

        if (forum && forum.id) {
          browserHistory.push(`/community?forumId=${forum.id}`)
        }
      })
      .catch((err) => {
        return err;
      });
  }

  patchForum(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .put('/forum', params)
        .then((forum) => {
          dispatch(forum);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  getSearchForumList(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .get('/search/forum/list', params)
        .then((res) => {

          res.data = normalize(res.data, arrayOf(forum));

          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  validateBeforeCreateForum(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .get('/validate/forum/create', params)
        .then((res) => {

          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    }
  }
}

export default alt.createActions(ForumActions);
