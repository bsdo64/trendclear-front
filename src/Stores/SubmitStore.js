import alt from '../Utils/alt';
import {browserHistory} from 'react-router';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import UserActions from '../Actions/UserActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState, locationHref } from './Helper/func';

class SubmitStore{
  constructor() {
    this.displayName = 'SubmitStore';

    this.bindActions(AppActions);
    this.bindActions(UserActions);
    this.bindActions(PostActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }
  onHandleTitle(title) {
    this.setMergeState(Map({title: title}));
  }
  onHandleContent(content) {
    this.setMergeState(Map({content: content}));
  }
  onSubmitPost(result) {
    if (result) {
      browserHistory.replace('/community?categoryId=1&forumId=38&postId=' + result.id);
    }
  }
}

export default alt.createStore(immutable(SubmitStore));
