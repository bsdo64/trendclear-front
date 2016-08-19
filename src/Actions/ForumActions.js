import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {browserHistory} from 'react-router';
import {normalize, arrayOf} from 'normalizr';
import {post, comment, subComment} from '../Model/normalizr/schema';

class PostActions {
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
}

export default alt.createActions(PostActions);
