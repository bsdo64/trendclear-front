import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize} from 'normalizr';
import {post, comment, subComment} from '../Model/normalizr/schema';

class SubCommentActions {
  constructor() {
    this.generateActions('addList');
  }
}

export default alt.createActions(SubCommentActions);
