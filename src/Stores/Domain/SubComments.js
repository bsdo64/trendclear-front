import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import SubCommentActions from '../../Actions/SubCommentActions';
import CommentActions from '../../Actions/CommentActions';
import DeleteActions from '../../Actions/DeleteActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class SubComments {
  static displayName = 'SubComments';
  constructor() {
    this.displayName = 'SubComments';

    this.bindActions(SubCommentActions);
    this.bindActions(CommentActions);
    this.bindActions(DeleteActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
  onAddList(subComments) {
    this.setMergeState(subComments);
  }

  onSubmitSubComment(IComment) {

    const subComments = IComment.entities.subComments;

    const addSubComment = this.state.merge(subComments);

    this.setState(addSubComment);
  }

  onSubmitComment(IPost) {
    let addCommentState = this.state.merge(IPost.entities.subComments);
    this.setState(addCommentState);
  }

  onLikeSubComment(subCommentId) {
    if (subCommentId) {
      const countComment = this.state.update(subCommentId.toString(), subComment =>
        subComment.mergeDeep({
          liked: true,
          like_count: subComment.get('like_count') + 1
        })
      );

      this.setState(countComment);
    }
  }

  onDelete(subComment) {
    if (subComment && subComment.comment_id) {
      const setSubComment = this.state.mergeDeepIn([subComment.id.toString()], subComment);
      this.setState(setSubComment);
    }
  }

  onUpdateSubComment(subComment) {
    if (subComment.result) {
      let setComment = this.state.mergeDeep(subComment.entities.subComments);
      this.setState(setComment);
    }
  }
}

export default alt.createStore(immutable(SubComments), SubComments.displayName);
