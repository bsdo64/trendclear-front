import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import MyArea from '../../components/MyArea';
import { Noti, Point } from '~/Utils/Socket';
import { UI } from '../../Reducers/InitialStates';
import {
  toggleLoginModal,
  requestLogout,
} from '../../Actions/Login';
import {
  requestUserReadNotification,
} from '../../Actions/User';

class MyMenuContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {LoginStore} = nextProps;

    if (this.props.LoginStore.get('isLogin') === false
      && LoginStore.get('isLogin') === true) {
      Noti.emit('join_room');
      Point.emit('join_room');
    }
  }

  render() {
    return (<MyArea {...this.props} />);
  }
}

MyMenuContainer.propTypes = {
  LoginStore: PropTypes.object.isRequired,
};
MyMenuContainer.defaultProps = {
  LoginStore: UI.Login,
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
    LoginStore: getUIState('Login'),
    UserStore: getUser(StoreState),
    Notis: getDomainState('Notis'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireToggleLoginModal: toggleLoginModal,
    FireRequestLogout: requestLogout,
    FireRequestUserReadNotification: requestUserReadNotification,
  }
)(MyMenuContainer);
