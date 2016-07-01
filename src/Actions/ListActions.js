import alt from '../Utils/alt';
import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../Model/normalizr/schema';

import PostActions from './PostActions';

class ListActions {
  constructor() {
    this.generateActions('add')
  }
}

export default alt.createActions(ListActions);
