import alt from '../Utils/alt';
import Immutable, {Map, List} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import GnbActions from '../Actions/GnbActions';
import CommentActions from '../Actions/CommentActions';
import CommunityActions from '../Actions/CommunityActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState } from './Helper/func';
import {browserHistory} from 'react-router';

class CommunityStore{
  constructor() {
    this.displayName = 'CommunityStore';

    this.bindActions(AppActions);
    this.bindActions(GnbActions);
    this.bindActions(CommentActions);
    this.bindActions(PostActions);
    this.bindActions(CommunityActions);
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

  onLikeComment(commentId) {
    const countComment = this.state.updateIn(['post', 'IPost', 'entities', 'comments', commentId+''], comment =>
      comment.mergeDeep({
        liked: true,
        like_count: comment.get('like_count') + 1
      })
    );

    this.setState(countComment);
  }

  onLikeSubComment(subCommentId) {
    const countComment = this.state.updateIn(['post', 'IPost', 'entities', 'subComments', subCommentId+''], subComment =>
      subComment.mergeDeep({
        liked: true,
        like_count: subComment.get('like_count') + 1
      })
    );

    this.setState(countComment);
  }

  onResetPost() {
    this.setState(Map({
      posts: {},
      noMore: false
    }));
  }

  onLikePost(postId) {
    const IPost = this.state.getIn(['post', 'IPost']);

    if (IPost) {
      const countPost = this.state.updateIn(['post', 'IPost', 'entities', 'posts', postId+''], post =>
        post.mergeDeep({
          liked: true,
          like_count: post.get('like_count') + 1
        })
      );
      const countList = countPost.updateIn(['list', 'postList', 'entities', 'posts', postId+''], post =>
        post.mergeDeep({
          liked: true,
          like_count: post.get('like_count') + 1
        })
      );

      this.setState(countList);
    }
  }
}

export default alt.createStore(immutable(CommunityStore));
