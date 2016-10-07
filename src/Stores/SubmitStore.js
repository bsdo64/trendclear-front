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
  onHandleContent(postData) {
    this.setMergeState(Map({
      ...postData
    }));
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
    const state = this.state.update('postImages', list => {
      if (list) {
        return list.push(result)
      } else {
        list = List();
        return list.push(result);
      }
    });
    this.setMergeState(state);
  }

  onDeleteImages(result) {
    const state = this.state.update('postImages', list => {
      return list.filterNot(i => i.deleteUrl === result.deleteUrl)
    });
    this.setMergeState(state);
  }

  onSetRepresentImage(data) {
    const state = this.state.set('representingImage', data.index);
    this.setState(state);
  }
}

export default alt.createStore(immutable(SubmitStore), SubmitStore.displayName);
