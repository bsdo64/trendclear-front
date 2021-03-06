import React from 'react';
import { connect } from 'react-redux';
import SubmitPost from '../../../../components/Contents/SubmitPost';
import { UI } from '../../../../Reducers/InitialStates';
import { getUser, forumCreated, forumFollowed } from '../../../../Selectors/User';
import { rankForums } from '../../../../Selectors/Forum';
import {
  removeServerInit,
  handlePostContent,
  handlePostTitle,
  handleResetPostContent,
  handleSelectPrefix,
  handleAddPostImages,
  handleDeletePostImages,
  handleSetRepresentImage,
  requestSubmitPost,
  requestDeleteUnUsingImage,
  requestUpdatePost,
  requestGetPostMeta,
} from '../../../../Actions/Post';

class SubmitPostContainer extends React.Component {
  render() {
    return (<SubmitPost {...this.props} />);
  }
}

SubmitPostContainer.defaultProps = {
  AuthStore: UI.Auth,
  UserStore: UI.User,
  SubmitPostStore: UI.SubmitPost,
};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    SubmitPostStore: getUIState('SubmitPost'),
    AuthStore: getUIState('Auth'),
    LoginStore: getUIState('Login'),
    UserStore: getUser(StoreState),
    ForumFollowed: forumFollowed(StoreState),
    ForumCreated: forumCreated(StoreState),
    RankForums: rankForums(StoreState),
    Posts: getDomainState('Posts'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRemoveServerInit: removeServerInit,
    FireHandlePostContent: handlePostContent,
    FireHandlePostTitle: handlePostTitle,
    FireHandleResetPostContent: handleResetPostContent,
    FireRequestSubmitPost: requestSubmitPost,
    FireHandleSelectPrefix: handleSelectPrefix,
    FireHandleAddPostImages: handleAddPostImages,
    FireHandleDeletePostImages: handleDeletePostImages,
    FireHandleSetRepresentImage: handleSetRepresentImage,
    FireRequestDeleteUnUsingImage: requestDeleteUnUsingImage,
    FireRequestUpdatePost: requestUpdatePost,
    FireRequestGetPostMeta: requestGetPostMeta,
  }
)(SubmitPostContainer);
