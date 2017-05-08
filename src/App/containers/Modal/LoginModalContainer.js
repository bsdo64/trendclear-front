import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import LoginModalBox from '../../components/Modals/Components/Login/index';
import {
  requestLogin,
  toggleLoginModal
} from '../../Actions/Login';

class LoginModalContainer extends React.Component {
  render() {
    return (<LoginModalBox {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    LoginStore: getUIState('Login'),
    ModalStore: getUIState('Modal'),
    UserStore: getUser(StoreState),
  };
};

export default connect(
  mapStateToProps,
  {
    FireToggleLoginModal: toggleLoginModal,
    FireRequestLogin: requestLogin,
  }
)(LoginModalContainer);
