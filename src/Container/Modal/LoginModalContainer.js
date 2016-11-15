import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import LoginModalBox from '../../Components/Modal/Components/Login/index';

const LoginModalContainer = React.createClass({
  render() {
    return (<LoginModalBox {...this.props} />)
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
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModalContainer);
