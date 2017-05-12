import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import SubmitForumBox from '../../components/Contents/SubmitForum';
import { UI } from '../../Reducers/InitialStates';
import {
  requestCreateForum,
  requestValidateTitleForumCreate,
} from '../../Actions/Forum';

class SubmitForum extends React.Component {
  render() {
    return <SubmitForumBox {...this.props} />;
  }
}

SubmitForum.propTypes = {
  SubmitForumStore: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
};
SubmitForum.defaultProps = {
  SubmitForumStore: UI.SubmitForum,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    SubmitForumStore: getUIState('SubmitForum'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestValidateTitleForumCreate: requestValidateTitleForumCreate,
    FireRequestCreateForum: requestCreateForum,
  }
)(SubmitForum);
