import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import ListActions from '../../Actions/ListActions';
import PostActions from '../../Actions/PostActions';
import ForumActions from '../../Actions/ForumActions';
import GnbActions from '../../Actions/GnbActions';
import DeleteActions from '../../Actions/DeleteActions';
import CollectionActions from '../../Actions/CollectionActions';
import { initListener, setMergeState } from '../Helper/func';
import Users from '../Domain/Users';
import Forums from '../Domain/Forums';
import Posts from '../Domain/Posts';
import GnbStore from '../GnbStore';

class ListStore {
  static displayName = 'ListStore';

  constructor() {
    this.displayName = 'ListStore';

    this.bindActions(ListActions);
    this.bindActions(DeleteActions);
    this.bindActions(ForumActions);
    this.bindActions(PostActions);
    this.bindActions(GnbActions);
    this.bindActions(CollectionActions);
    this.state = Immutable.Map({});

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

    const newState = this.state.update(listName, list => list ? list.concat(normalizedPosts.result) : [].concat(normalizedPosts.result));
    this.setState(newState);
  }

  onGetSearchPost(response) {
    this.waitFor(Users, Posts);
    const normalizedPosts = response.data;

    const newState = this.state.update('searchPostList', list => list ? list.concat(normalizedPosts.result) : [].concat(normalizedPosts.result));
    this.setState(newState);
  }

  onGetMoreMyPost(response) {
    this.waitFor(Users, Posts);
    const normalizedPosts = response.data;

    const newState = this.state.update(response.type, list => list ? list.concat(normalizedPosts.result) : [].concat(normalizedPosts.result));
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

    this.setMergeState({ searchCollectionForumList: normalizedForums.result });
  }

  onDelete(deletedItem) {
    let mergeResults = this.state;

    if (!deletedItem.comment_id) {
      if (this.state.get('bestPostList')) {
        const itemIndex = this.state.get('bestPostList').findIndex(postId => postId === deletedItem.id);
        const deletedList = this.state.get('bestPostList').splice(itemIndex, 1);
        mergeResults = mergeResults.set('bestPostList', deletedList);
      }

      if (this.state.get('myWritePostList')) {
        const itemIndex = this.state.get('myWritePostList').findIndex(postId => postId === deletedItem.id);
        const deletedList = this.state.get('myWritePostList').splice(itemIndex, 1);
        mergeResults = mergeResults.set('myWritePostList', deletedList);
      }

      if (this.state.get('likePostList')) {
        const itemIndex = this.state.get('likePostList').findIndex(postId => postId === deletedItem.id);
        const deletedList = this.state.get('likePostList').splice(itemIndex, 1);
        mergeResults = mergeResults.set('likePostList', deletedList);
      }

      this.setState(mergeResults);
    }
  }

  onSetScroll(scroll) {
    this.setMergeState(scroll)
  }

  onGetSearchForumList(result) {
    this.waitFor(Forums, Users);

    const normalized = result.data;
    const pagination = result.collection;

    if (normalized) {
      const newState = this.state.set('searchForumList', normalized.result);
      this.setState(newState);
    }
  }
}

export default alt.createStore(immutable(ListStore), ListStore.displayName);
