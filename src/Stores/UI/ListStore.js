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
    const normalizedPosts = response.results;

    const newState = this.state.update('bestPostList', list => list.concat(normalizedPosts.result));
    this.setState(newState);
  }

  onSaveFilter(response) {
    this.waitFor(GnbStore, Users, Posts);

    if (response) {
      const normalizedPosts = response.results;
      const total = response.total;
      const limit = 10;

      const mergeResults = this.state.set('bestPostList', normalizedPosts.result);
      this.setMergeState(mergeResults.toJS());
    }
  }
}

export default alt.createStore(immutable(ListStore), ListStore.name);
