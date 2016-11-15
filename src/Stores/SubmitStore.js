import alt from '../Utils/alt';
import { browserHistory } from 'react-router';
import Immutable, { Map, List } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import UserActions from '../Actions/UserActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState } from './Helper/func';

class SubmitStore {
  static get displayName() { return 'SubmitStore' }

  constructor() {

    this.bindActions(UserActions);
    this.bindActions(PostActions);
    this.state = Immutable.fromJS({
      deletedUrl: List(),
      representingImage: null
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onHandleTitle(title) {
    this.setMergeState(Map({ title: title }));
  }

  onHandleContent(postData) {
    this.setMergeState(Map({
      ...postData
    }));
  }

  onSelectPrefix(prefixId) {
    this.setMergeState(Map({ selectPrefixId: prefixId }));
  }

  onCheckAnnounce(checked) {
    this.setMergeState(Map({ announce: checked }));
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
    this.setMergeState(Map({ server: null }));
  }

  onRemoveContent() {
    this.setMergeState(Map({
      selectPrefixId: null,
      title: '',
      content: null
    }));
  }

  onGetMeta(result) {
    this.setMergeState({ urlMetaData: result });
  }

  onAddImages(result) {
    const state = this.state.update('postImages', list => {
      if (!list) {
        list = List();
      }
      return list.push(result);
    });

    let newState;
    if ((this.state.get('representingImage') === null) || (this.state.get('representingImage') === undefined)) {
      newState = state.set('representingImage', 0);
    } else {
      newState = state;
    }

    this.setMergeState(newState);
  }

  onDeleteImages(result) {
    let deleteItemIndex = null;
    const state = this.state.update('postImages', list => {
      return list.filterNot((item, index) => {

        const deleteItem = item.deleteUrl === result.deleteUrl;
        if (deleteItem) {
          deleteItemIndex = index;
        }
        return deleteItem
      })
    });

    let newState;
    if (deleteItemIndex !== null) {
      if (state.get('postImages').size > 0) {
        newState = state.set('representingImage', 0);
      } else {
        newState = state.set('representingImage', null);
      }
    } else {
      newState = state;
    }
    this.setMergeState(newState);
  }

  onSetRepresentImage(data) {
    const state = this.state.set('representingImage', data.index);
    this.setState(state);
  }
}

export default alt.createStore(immutable(SubmitStore), SubmitStore.displayName);
