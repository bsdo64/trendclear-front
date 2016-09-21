import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState, locationHref } from '../Helper/func';
import {normalize} from 'normalizr';
import {author} from '../../Model/normalizr/schema';

import UserStore from '../UserStore';

import PostActions from '../../Actions/PostActions';
import ForumSettingActions from '../../Actions/ForumSettingActions';
import CommentActions from '../../Actions/CommentActions';
import UserActions from '../../Actions/UserActions';
import GnbActions from '../../Actions/GnbActions';

class Users {
  static displayName = 'Users';
  constructor() {
    this.displayName = 'Users';

    this.bindActions(UserActions);
    this.bindActions(PostActions);
    this.bindActions(CommentActions);
    this.bindActions(GnbActions);
    this.bindActions(ForumSettingActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onAddList(users) {
    this.setMergeState(users);
  }

  onGetBestPost(response) {
    const normalizedPosts = response.data;

    const newState = this.state.mergeDeep(normalizedPosts.entities.author);
    this.setState(newState);
  }

  onGetSearchPost(response) {
    const normalizedPosts = response.data;

    const newState = this.state.mergeDeep(normalizedPosts.entities.author);
    this.setState(newState);
  }

  onGetMoreMyPost(response) {
    const normalizedPosts = response.data;

    const newState = this.state.mergeDeep(normalizedPosts.entities.author);
    this.setState(newState);
  }

  onSaveFilter(res) {
    if (res.data) {
      const normalizedPosts = res.data;
      const newState = this.state.mergeDeep(normalizedPosts.entities.author);
      this.setState(newState);
    }
  }

  onUploadAvatarImage(result) {
    if (result.file && result.file.files[0] && result.user.user.id) {
      const file = result.file.files[0];
      let state = this.state.updateIn([result.user.user.id.toString(), 'profile', 'avatar_img'], f => file.name);
      this.setMergeState(state);
    }
  }

  onSubmitSubComment(IComment) {

    const subCommentAuthor = IComment.entities.author;

    const addSubCommentAuthor = this.state.mergeDeep(subCommentAuthor);

    this.setState(addSubCommentAuthor);
  }

  onSubmitComment(IPost) {
    let addCommentState = this.state.mergeDeep(IPost.entities.author);
    this.setState(addCommentState);
  }

  onFollowForum(result) {
    this.waitFor(UserStore);

    const newFollowState = this.state
      .update(result.user_id.toString(), user =>
        user.update('follow_forums', list => list.push(result.forum_id))
      );
    this.setState(newFollowState);
  }

  onUnFollowForum(result) {
    this.waitFor(UserStore);

    const newFollowState = this.state
      .update(result.user_id.toString(), user =>
        user.update('follow_forums', list => list.filterNot(v => v === result.forum_id))
      );
    this.setState(newFollowState);
  }

  onAddManager(result) {
    const user = {
      [result.manager.user_id]: result.user
    };
    const newState = this.state.mergeDeep(user);

    this.setState(newState);
  }

  onAddBanUser(result) {
    const user = {
      [result.bannedUser.user_id]: result.user
    };
    const newState = this.state.mergeDeep(user);

    this.setState(newState);
  }
}

export default alt.createStore(immutable(Users), Users.displayName);
