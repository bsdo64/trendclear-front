import alt from '../../Utils/alt';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState, setMergeDeep, locationHref } from '../Helper/func';
import Immutable, {List, Map, fromJS} from 'immutable';
import {normalize} from 'normalizr';
import {author} from '../../Model/normalizr/schema';

import PostActions from '../../Actions/PostActions';
import ForumActions from '../../Actions/ForumActions';
import ForumSettingActions from '../../Actions/ForumSettingActions';
import CommentActions from '../../Actions/CommentActions';
import UserActions from '../../Actions/UserActions';
import GnbActions from '../../Actions/GnbActions';

import AuthStore from '../UI/AuthStore';
import SettingStore from '../SettingStore';
import VenaStoreActions from '../../Actions/VenaStoreActions'
import CommunityStore from '../CommunityStore';

class Users {
  static displayName = 'Users';
  constructor() {
    this.displayName = 'Users';

    this.bindActions(UserActions);
    this.bindActions(PostActions);
    this.bindActions(ForumActions);
    this.bindActions(CommentActions);
    this.bindActions(GnbActions);
    this.bindActions(ForumSettingActions);
    this.bindActions(VenaStoreActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
    this.setMergeDeep = setMergeDeep.bind(this);
  }

  _findUserById(userId) {
    if (userId) {
      return this.state.get(userId.toString());
    } else {
      return null;
    }
  }

  _findLoginUser() {
    const userId = AuthStore.getState().get('userId');
    if (userId) {
      return this._findUserById(userId);
    } else {
      return null;
    }
  }

  _setUserUpdateById(UserState, userId, userData) {
    if (userId) {
      return UserState.set(userId.toString(), fromJS(userData));
    } else {
      return null;
    }
  }

  onRequestLogout(result) {
    if (result === 'ok') {

      locationHref('/');
    }
  }

  onOpenAvatarModalOpen() {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUsers = this._setUserUpdateById(this.state, loginUser.get('id'), loginUser.set('openAvatarModal', true));

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onCloseAvatarModal() {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUsers = this._setUserUpdateById(this.state, loginUser.get('id'), loginUser.set('openAvatarModal', false));

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onAddList(users) {
    this.setMergeState(users);
  }

  onGetBestPost(response) {
    const normalizedPosts = response.data;

    this.setMergeDeep(normalizedPosts.entities.author);
  }

  onGetSearchPost(response) {
    const normalizedPosts = response.data;

    this.setMergeDeep(normalizedPosts.entities.author);
  }

  onGetMoreMyPost(response) {
    const normalizedPosts = response.data;

    this.setMergeDeep(normalizedPosts.entities.author);
  }

  onSaveFilter(res) {
    if (res.data) {
      const normalizedPosts = res.data;

      this.setMergeDeep(normalizedPosts.entities.author);
    }
  }

  onUploadAvatarImage(result) {
    if (result.file && result.file.files[0] && result.user.user.id) {
      const file = result.file.files[0];

      const loginUser = this._findLoginUser();
      if (loginUser) {
        const updateUser = loginUser
          .updateIn(['profile', 'avatar_img'], f => file.name)
          .set('openAvatarModal', false);

        const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

        if (updateUsers) {
          this.setState(updateUsers);
        }
      }
    }
  }

  onLevelUp(newTrendbox) {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser.set('trendbox', newTrendbox);

      const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onSubmitSubComment(IComment) {
    this.waitFor(CommunityStore);

    const addSubCommentAuthor = this.state.mergeDeep(IComment.entities.author);
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser
        .update('skills', skills => skills.map(s => {
          if (s.getIn(['skill', 'name']) === 'write_sub_comment') {
            return s.set('using_at', new Date())
          } else {
            return s
          }
        }))
        .update('trendbox', trendbox => {
          return trendbox
            .set('exp', trendbox.get('exp') + 5)
            .set('T', trendbox.get('T') + 10)
        });

      const updateUsers = this._setUserUpdateById(addSubCommentAuthor, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onSubmitComment(IPost) {
    this.waitFor(CommunityStore);

    const addCommentState = this.state.mergeDeep(IPost.entities.author);
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser
        .update('skills', skills => skills.map(s => {
          if (s.getIn(['skill', 'name']) === 'write_comment') {
            return s.set('using_at', new Date())
          } else {
            return s
          }
        }))
        .update('trendbox', trendbox => {
          return trendbox
            .set('exp', trendbox.get('exp') + 5)
            .set('T', trendbox.get('T') + 10)
        });

      const updateUsers = this._setUserUpdateById(addCommentState, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onUpdateProfile(result) {
    this.waitFor(SettingStore);

    if (result.length === 1) {
      const newProfile = result[0];
      const loginUser = this._findLoginUser();
      if (loginUser) {
        const updateUser = loginUser.set('profile', newProfile);

        const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

        if (updateUsers) {
          this.setState(updateUsers);
        }
      }
    }
  }

  onSocketNoti(normalizedNoti) {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser.setIn(['notifications', 'INoti'], fromJS(normalizedNoti));

      const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onReadNoti(params) {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser
        .updateIn(['notifications', 'INoti', 'entities', 'notis', params.id.toString()], v => {
          return v
            .set('read', true)
            .set('read_at', new Date)
        });

      const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onFollowForum(result) {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser
        .update('follow_forums', list => list.push(result.forum_id));

      const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onUnFollowForum(result) {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser
        .update('follow_forums', list => list.filterNot(v => v === result.forum_id));

      const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onSocketPoint(data) {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser
        .updateIn(['trendbox', 'T'], point => data.TP ? point + data.TP : point)
        .updateIn(['trendbox', 'R'], point => data.RP ? point + data.RP : point);

      const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onRemoveAvatarImage(deleted) {
    if (deleted) {
      const loginUser = this._findLoginUser();
      if (loginUser) {
        const updateUser = loginUser
          .updateIn(['profile', 'avatar_img'], imageName => null);

        const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

        if (updateUsers) {
          this.setState(updateUsers);
        }
      }
    }
  }

  onRequestPurchaseItem(result) {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser
        .updateIn(['inventories', 0], inventory => inventory.mergeDeep(result.inventories))
        .updateIn(['trendbox'], trendbox => trendbox.merge(result.trendbox));

      const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onRequestActivateVenalink(result) {
    const loginUser = this._findLoginUser();
    if (loginUser) {
      const updateUser = loginUser
        .updateIn(['trendbox'], trendbox => trendbox.merge(result.trendbox))
        .updateIn(['inventories', 0], inventory => inventory.mergeDeep(result.inventories));

      const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

      if (updateUsers) {
        this.setState(updateUsers);
      }
    }
  }

  onRequestParticipateVenalink(result) {
    if (result.success) {
      const loginUser = this._findLoginUser();
      if (loginUser) {
        const updateUser = loginUser
          .updateIn(['inventories', 0], inventory => inventory.mergeDeep(result.inventories))
          .update('participateVenalinks', list =>
            list ? list.push(Map(result.participateVenalink)) : List(Map(result.participateVenalink))
          );
        const updateUsers = this._setUserUpdateById(this.state, updateUser.get('id'), updateUser);

        if (updateUsers) {
          this.setState(updateUsers);
        }
      }
    }
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

  onGetSearchForumList(result) {
    const normalized = result.data;
    const pagination = result.collection;

    if (normalized) {
      this.setMergeDeep(normalized.entities.author);
    }
  }
}

export default alt.createStore(immutable(Users), Users.displayName);
