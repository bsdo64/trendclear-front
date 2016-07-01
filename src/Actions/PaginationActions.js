import alt from '../Utils/alt';
import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../Model/normalizr/schema';

import PostActions from './PostActions';

class PaginationActions {
  constructor() {
    this.generateActions('addPagination')
  }
}

export default alt.createActions(PaginationActions);
