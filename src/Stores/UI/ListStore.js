import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import ListActions from '../../Actions/ListActions';
import PostActions from '../../Actions/PostActions';
import GnbActions from '../../Actions/GnbActions';
import CollectionActions from '../../Actions/CollectionActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import Users from '../Domain/Users';
import Forums from '../Domain/Forums';
import Posts from '../Domain/Posts';
import GnbStore from '../GnbStore';

import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../../Model/normalizr/schema';

class ListStore {
  static displayName = 'ListStore';
  constructor() {
    this.displayName = 'ListStore';

    this.bindActions(ListActions);
    this.bindActions(PostActions);
    this.bindActions(GnbActions);
    this.bindActions(CollectionActions);
    this.state = Immutable.Map({
      
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onAdd(list) {
    this.setMergeState(list);
  }

  onGetBestPost(response) {
    this.waitFor(Users, Posts);
    const normalizedPosts = response.data;
    const listName = response.listName;

    const newState = this.state.update(listName, list => list.concat(normalizedPosts.result));
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

  onFindForumByTitle(normalizedForums) {
    this.waitFor(Forums);

    this.setMergeState({searchCollectionForumList: normalizedForums.result});
  }
}

export default alt.createStore(immutable(ListStore), ListStore.displayName);
