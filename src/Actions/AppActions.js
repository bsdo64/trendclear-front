import alt from '../Utils/alt';
import assign from 'deep-assign';
import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti, forum} from '../Model/normalizr/schema';

import PostActions from './PostActions';
import UserActions from './UserActions';
import ListActions from './ListActions';
import PaginationActions from './PaginationActions';

class AppActions {
  init(bootstrapData) {


    //return bootstrapData;
  }

  openSideCategory(clubId) {
    return clubId;
  }
}

module.exports = alt.createActions(AppActions);
