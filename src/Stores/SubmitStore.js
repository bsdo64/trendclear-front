import alt from '../Utils/alt';
import {browserHistory} from 'react-router';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import UserActions from '../Actions/UserActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState, locationHref } from './Helper/func';

class SubmitStore{
  static displayName = 'SubmitStore';
  constructor() {

    this.bindActions(AppActions);
    this.bindActions(UserActions);
    this.bindActions(PostActions);
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
  onHandleTitle(title) {
    this.setMergeState(Map({title: title}));
  }
  onHandleContent(content) {
    this.setMergeState(Map({content: content}));
  }
  onSelectPrefix(prefixId) {
    this.setMergeState(Map({selectPrefixId: prefixId}));
  }
  onSubmitPost(result) {
    if (result) {
      let forum = result.forum;

      this.setMergeState({
        title: null,
        content: null
      });

      browserHistory.replace(
        '/community?categoryId=' + forum.category.id +
                  '&forumId=' + forum.id +
                  '&postId=' + result.id
      );
    }
  }
  onRemoveContent() {
    this.setMergeState(Map({
      selectPrefixId: null,
      title: '',
      content: null
    }));
  }
}

export default alt.createStore(immutable(SubmitStore), SubmitStore.displayName);
