import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import PostActions from '../../Actions/PostActions';
import PaginationActions from '../../Actions/PaginationActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import Users from '../Domain/Users';
import Posts from '../Domain/Posts';
import ListStore from './ListStore';

class PaginationStore {
  static displayName = 'PaginationStore';
  constructor() {
    this.displayName = 'PaginationStore';

    this.bindActions(AppActions);
    this.bindActions(PostActions);
    this.bindActions(PaginationActions);
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

  onAddPagination(collection) {
    this.setMergeState(collection);
  }

  onGetBestPost(response) {
    this.waitFor(Users, Posts, ListStore);

    this.setMergeState({bestPostList: response.collection});
  }

}

export default alt.createStore(immutable(PaginationStore), PaginationStore.displayName);
