import alt from '../Utils/alt';
import {browserHistory} from 'react-router';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import UserActions from '../Actions/UserActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState, locationHref } from './Helper/func';

class SubmitStore{
  static displayName = 'SubmitStore';
  constructor() {

    this.bindActions(UserActions);
    this.bindActions(PostActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
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
        '/community?forumId=' + forum.id +
                  '&postId=' + result.id
      );
    }
  }
  onModPost(result) {
    if (result) {
      let forum = result.forum;

      this.setMergeState({
        title: null,
        content: null
      });

      browserHistory.replace(
        '/community?forumId=' + forum.id +
        '&postId=' + result.id
      );
    }
  }
  onRemoveServerInit() {
    this.setMergeState(Map({server: null}));
  }
  onRemoveContent() {
    this.setMergeState(Map({
      selectPrefixId: null,
      title: '',
      content: null
    }));
  }
  onGetMeta(result) {
    this.setMergeState({urlMetaData: result});
  }
}

export default alt.createStore(immutable(SubmitStore), SubmitStore.displayName);
