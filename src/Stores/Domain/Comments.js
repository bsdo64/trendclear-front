import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import CommentActions from '../../Actions/CommentActions';
import DeleteActions from '../../Actions/DeleteActions';
import { initListener, setMergeState } from '../Helper/func';

class Comments {
  static displayName = 'Comments';

  constructor() {
    this.displayName = 'Comments';

    this.bindActions(DeleteActions);
    this.bindActions(CommentActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
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

  onSubmitComment(comment) {
    let addCommentState = this.state.merge(comment.entities.comments);
    this.setMergeState(addCommentState);
  }

  onUpdateComment(comment) {
    if (comment.result) {
      let setComment = this.state.mergeDeep(comment.entities.comments);
      this.setState(setComment);
    }
  }

  onDelete(comment) {
    if (comment && comment.id && !comment.comment_id) {
      const setComment = this.state.mergeDeepIn([comment.id.toString()], comment);
      this.setState(setComment);
    }
  }
}

export default alt.createStore(immutable(Comments), Comments.displayName);
