import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import CommentActions from '../../Actions/CommentActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Comments {
  static displayName = 'Comments';
  constructor() {
    this.displayName = 'Comments';

    this.bindActions(AppActions);
    this.bindActions(CommentActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {

  }

  onAddList(comments) {
    this.setMergeState(comments);
  }

  onLikeComment(commentId) {
    if (commentId) {
      const newState = this.state.update(commentId.toString(), c =>
        c.mergeDeep({
          liked: true,
          like_count: c.get('like_count') + 1
        })
      );

      this.setState(newState);
    }
  }

  onSubmitSubComment(IComment) {

    const commentId = IComment.commentId;
    const subCommentId = IComment.result;

    const addSubComment = this.state.updateIn([commentId.toString(), 'subComments'], list =>
      list.push(subCommentId)
    );
    const addIncrement = addSubComment.updateIn([commentId.toString(), 'sub_comment_count'], value =>
      value + 1
    );

    this.setState(addIncrement);
  }

  onSubmitComment(IPost) {
    let addCommentState = this.state.merge(IPost.entities.comments);
    this.setMergeState(addCommentState);
  }
}

export default alt.createStore(immutable(Comments), Comments.displayName);
