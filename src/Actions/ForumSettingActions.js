import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {browserHistory} from 'react-router';
import {normalize, arrayOf} from 'normalizr';
import {post, comment, subComment} from '../Model/normalizr/schema';

class ForumSettingActions {
  constructor() {
    this.generateActions('resetButton', 'changeForumData');
  }
}

export default alt.createActions(ForumSettingActions);
