import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import PostActions from '../../Actions/PostActions';
import ForumActions from '../../Actions/ForumActions';
import GnbActions from '../../Actions/GnbActions';
import PaginationActions from '../../Actions/PaginationActions';
import { initListener, setMergeState } from '../Helper/func';
import Users from '../Domain/Users';
import Posts from '../Domain/Posts';
import Forums from '../Domain/Forums';
import ListStore from './ListStore';

class PaginationStore {
  static displayName = 'PaginationStore';

  constructor() {
    this.displayName = 'PaginationStore';

    this.bindActions(GnbActions);
    this.bindActions(ForumActions);
    this.bindActions(PostActions);
    this.bindActions(PaginationActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onAddPagination(collection) {
    this.setMergeState(collection);
  }

  onGetBestPost(response) {
    this.waitFor(Users, Posts, ListStore);

    this.setMergeState({ [response.listName]: response.collection });
  }

  onGetSearchPost(response) {
    this.waitFor(Users, Posts, ListStore);

    this.setMergeState({ searchPostList: response.collection });
  }

  onGetMoreMyPost(response) {
    this.waitFor(Users, Posts, ListStore);

    this.setMergeState({ [response.type]: response.collection });
  }

  onSaveFilter(res) {
    const collection = res.collection;

    this.setMergeState({ bestPostList: collection });
  }

  onGetSearchForumList(result) {
    this.waitFor(Forums, Users, ListStore);

    const pagination = result.collection;

    if (pagination) {
      this.setMergeState({ searchForumList: pagination });
    }
  }
}

export default alt.createStore(immutable(PaginationStore), PaginationStore.displayName);
