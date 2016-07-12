import alt from '../Utils/alt';
import Immutable, {Map, List} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import GnbActions from '../Actions/GnbActions';
import CommentActions from '../Actions/CommentActions';
import CommunityActions from '../Actions/CommunityActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState } from './Helper/func';
import {browserHistory} from 'react-router';

class CommunityStore{
  static displayName = 'CommunityStore';
  
  constructor() {
    this.displayName = 'CommunityStore';

    this.bindActions(AppActions);
    this.bindActions(GnbActions);
    this.bindActions(CommentActions);
    this.bindActions(PostActions);
    this.bindActions(CommunityActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    const StoreData = bootstrapData[this.displayName];
    if (StoreData && !(this.state.equals(Immutable.fromJS(StoreData))) ) {
      this.setMergeState(StoreData);
    }

  }

  onResetPost() {
    this.setState(Map({
      posts: {},
      noMore: false
    }));
  }

  onResetData() {
    this.setState(Map({}));
  }
}

export default alt.createStore(immutable(CommunityStore), CommunityStore.displayName);
