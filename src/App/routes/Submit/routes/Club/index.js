import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../../../Selectors/User';
import SubmitForumBox from '../../../../components/Contents/SubmitForum';
import { UI } from '../../../../Reducers/InitialStates';
import {
  requestCreateForum,
  requestValidateTitleForumCreate,
} from '../../../../Actions/Forum';

class SubmitForum extends React.Component{
  render() {
    return <SubmitForumBox {...this.props} />;
  }
}

SubmitForum.defaultProps = {
  SubmitForumStore: UI.SubmitForum,
};
SubmitForum.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  SubmitForumStore: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    SubmitForumStore: getUIState('SubmitForum'),
    UserStore: getUser(StoreState),
  };
};

module.exports = withRouter(connect(
  mapStateToProps,
  {
    FireRequestValidateTitleForumCreate: requestValidateTitleForumCreate,
    FireRequestCreateForum: requestCreateForum,
  }
)(SubmitForum));
