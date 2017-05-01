import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Setting from '../../components/Contents/Setting';
import { UI } from '../../Reducers/InitialStates';
import {
  closeUserSettingMessage,
  requestUserUpdatePassword,
  requestUserUpdateProfile,
} from '../../Actions/User';

class SettingContainer extends React.Component {
  render() {
    return (<Setting {...this.props} />);
  }
}

SettingContainer.propTypes = {
  UserSettingStore: PropTypes.object.isRequired,
};
SettingContainer.defaultProps = {
  UserSettingStore: UI.UserSetting,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    UserSettingStore: getUIState('UserSetting'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  };
};

export default connect(
  mapStateToProps,
  {
    FireCloseUserSettingMessage: closeUserSettingMessage,
    FireRequestUserUpdatePassword: requestUserUpdatePassword,
    FireRequestUserUpdateProfile: requestUserUpdateProfile,
  }
)(SettingContainer);
