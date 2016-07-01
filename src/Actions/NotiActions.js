import alt from '../Utils/alt';
import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../Model/normalizr/schema';

import PostActions from './PostActions';

class NotiActions {
  constructor() {
    this.generateActions('addList')
  }
}

export default alt.createActions(NotiActions);
