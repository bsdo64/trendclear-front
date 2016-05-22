import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import GnbActions from '../Actions/GnbActions';
import CommentActions from '../Actions/CommentActions';
import { initListener, setMergeState } from './Helper/func';
import {browserHistory} from 'react-router';

class CommunityStore{
  constructor() {
    this.displayName = 'CommunityStore';

    this.bindActions(AppActions);
    this.bindActions(GnbActions);
    this.bindActions(CommentActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }

  onSubmitComment(IComment) {

    // const loc = browserHistory.createLocation(window.location);
    // browserHistory.replace(
    //   loc.pathname + '?categoryId=' + loc.query.categoryId +
    //   '&forumId=' + loc.query.forumId +
    //   '&postId=' + loc.query.postId +
    //   (loc.query.p ? ('&p=' + loc.query.p) : '') +
    //   '&comment_p=1'
    // );

    let addCommentState = this.state.mergeDeep({post: {IPost: {entities: IComment.entities} }});

    let postId = addCommentState.getIn(['post', 'IPost', 'result']).toString();
    let addIncrement = addCommentState.updateIn(['post', 'IPost', 'entities', 'posts', postId, 'comment_count'], value =>
      value + 1
    );
    let addListIncrement = addIncrement.updateIn(['list', 'postList', 'entities', 'posts', postId, 'comment_count'], value =>
      value + 1
    );

    this.setMergeState(addListIncrement.toJS());
  }

  onSubmitSubComment(IComment) {

    // const loc = browserHistory.createLocation(window.location);
    // browserHistory.replace(
    //   loc.pathname + '?categoryId=' + loc.query.categoryId +
    //   '&forumId=' + loc.query.forumId +
    //   '&postId=' + loc.query.postId +
    //   (loc.query.p ? ('&p=' + loc.query.p) : '') +
    //   '&comment_p=1'
    // );


    let commentId = IComment.commentId;
    let subCommentId = IComment.result;
    delete IComment.commentId;
    delete IComment.result;

    let addCommentState = this.state.mergeDeep({post: {IPost: {entities: IComment.entities }}});

    let addSubComment = addCommentState.updateIn(['post', 'IPost', 'entities', 'comments', commentId+'', 'subComments'], list =>
      list.push(subCommentId)
    );
    let addIncrement = addSubComment.updateIn(['post', 'IPost', 'entities', 'comments', commentId+'', 'sub_comment_count'], value =>
      value + 1
    );

    this.setMergeState(addIncrement.toJS());
  }
}

export default alt.createStore(immutable(CommunityStore));
