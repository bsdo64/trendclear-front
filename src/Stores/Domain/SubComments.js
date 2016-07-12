import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import SubCommentActions from '../../Actions/SubCommentActions';
import CommentActions from '../../Actions/CommentActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class SubComments {
  static displayName = 'SubComments';
  constructor() {
    this.displayName = 'SubComments';

    this.bindActions(AppActions);
    this.bindActions(SubCommentActions);
    this.bindActions(CommentActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {

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
}

export default alt.createStore(immutable(SubComments), SubComments.displayName);
