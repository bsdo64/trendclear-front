import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import SubmitPost from '../../Components/Contents/SubmitPost';
import { UI } from '../../Reducers/InitialStates';
import {
  removeServerInit,
  handlePostContent,
  handlePostTitle,
  handleResetPostContent,
  requestSubmitPost,
  handleSelectPrefix,
  handleAddPostImages,
  handleDeletePostImages,
  handleSetRepresentImage,
} from '../../Actions/Post';

const SubmitPostContainer = React.createClass({
  render() {
    return (<SubmitPost {...this.props} />);
  }
});

SubmitPostContainer.defaultProps = {
  AuthStore: UI.Auth,
  UserStore: UI.User,
  SubmitStore: UI.Submit,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    SubmitStore: getUIState('Submit'),
    AuthStore: getUIState('Auth'),
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
    Posts: getDomainState('Posts')
  }
};

module.exports = connect(
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
  }
)(SubmitPostContainer);
