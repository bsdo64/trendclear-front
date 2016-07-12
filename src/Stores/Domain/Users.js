import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import PostActions from '../../Actions/PostActions';
import CommentActions from '../../Actions/CommentActions';
import UserActions from '../../Actions/UserActions';
import GnbActions from '../../Actions/GnbActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Users {
  static displayName = 'Users';
  constructor() {
    this.displayName = 'Users';

    this.bindActions(AppActions);
    this.bindActions(UserActions);
    this.bindActions(PostActions);
    this.bindActions(CommentActions);
    this.bindActions(GnbActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }

  onAddList(users) {
    this.setMergeState(users);
  }

  onGetBestPost(response) {
    const normalizedPosts = response.data;

    const newState = this.state.merge(normalizedPosts.entities.author);
    this.setState(newState);
  }

  onSaveFilter(res) {
    if (res.data) {
      const normalizedPosts = res.data;
      const newState = this.state.merge(normalizedPosts.entities.author);
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

    const addSubCommentAuthor = this.state.merge(subCommentAuthor);

    this.setState(addSubCommentAuthor);
  }

  onSubmitComment(IPost) {
    let addCommentState = this.state.merge(IPost.entities.author);
    this.setState(addCommentState);
  }
}

export default alt.createStore(immutable(Users), Users.displayName);
