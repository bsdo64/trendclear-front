import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import ListActions from '../../Actions/ListActions';
import PostActions from '../../Actions/PostActions';
import GnbActions from '../../Actions/GnbActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import Users from '../Domain/Users';
import Posts from '../Domain/Posts';
import GnbStore from '../GnbStore';

import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../../Model/normalizr/schema';

class ListStore {
  static displayName = 'ListStore';
  constructor() {
    this.displayName = 'ListStore';

    this.bindActions(AppActions);
    this.bindActions(ListActions);
    this.bindActions(PostActions);
    this.bindActions(GnbActions);
    this.state = Immutable.Map({
      
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    const StoreData = bootstrapData[this.displayName];
    if (StoreData && !(this.state.equals(Immutable.fromJS(StoreData))) ) {
      this.setMergeState(StoreData);
    }

  }

  onAdd(list) {
    this.setMergeState(list);
  }

  onGetBestPost(response) {
    this.waitFor(Users, Posts);
    const normalizedPosts = response.data;

    const newState = this.state.update('bestPostList', list => list.concat(normalizedPosts.result));
    this.setState(newState);
  }

  onGetSearchPost(response) {
    this.waitFor(Users, Posts);
    const normalizedPosts = response.data;

    const newState = this.state.update('searchPostList', list => list.concat(normalizedPosts.result));
    this.setState(newState);
  }

  onGetMoreMyPost(response) {
    this.waitFor(Users, Posts);
    const normalizedPosts = response.data;

    const newState = this.state.update(response.type, list => list.concat(normalizedPosts.result));
    this.setState(newState);
  }

  onSaveFilter(response) {
    this.waitFor(GnbStore, Users, Posts);

    if (response.data) {
      const postIdList = response.data.result;

      const mergeResults = this.state.set('bestPostList', postIdList);
      this.setState(mergeResults);
    }
  }
}

export default alt.createStore(immutable(ListStore), ListStore.displayName);
