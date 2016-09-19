import alt from '../Utils/alt';
import {browserHistory} from 'react-router';
import Immutable, {Map, List} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import UserActions from '../Actions/UserActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState, locationHref } from './Helper/func';

class SubmitStore{
  static displayName = 'SubmitStore';
  constructor() {

    this.bindActions(UserActions);
    this.bindActions(PostActions);
    this.state = Immutable.fromJS({
      deletedUrl: List()
    });

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
  onCheckAnnounce(checked) {
    this.setMergeState(Map({announce: checked}));
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

  onAddImages(result) {
    const state = this.state.update('deleteUrl', list => {
      if (list) {
        return list.push(result.deleteUrl)
      } else {
        list = List();
        return list.push(result.deleteUrl);
      }
    });
    this.setMergeState(state);
  }

  onDeleteImages(result) {
    const state = this.state.update('deleteUrl', list => {
      return list.filterNot(i => i === result.deleteUrl)
    });
    this.setMergeState(state);
  }
}

export default alt.createStore(immutable(SubmitStore), SubmitStore.displayName);
