import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Setting from '../../Components/Contents/Setting';

const SettingContainer = React.createClass({
  render() {
    return (<Setting {...this.props} />)
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    SettingStore: getUIState('Setting'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

module.exports = connect(
  mapStateToProps,
  {

  }
)(SettingContainer);
