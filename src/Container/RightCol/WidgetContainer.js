import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import WidgetBox from '../../Components/WidgetBox';
import { UI, Domains } from '../../Reducers/InitialStates';
import { toggleVenacleStoreModal, } from '../../Actions/VenacleStore';
import { toggleAvatarModal, } from '../../Actions/User';

const WidgetContainer = React.createClass({
  render() {

    return (<WidgetBox {...this.props} />)
  }
});

WidgetContainer.defaultProps = {
  ShoppingStore: UI.Shopping,
  LoginStore: UI.Login,
  UserStore: UI.User,
  Forums: Domains.Forums
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    ShoppingStore: getUIState('Shopping'),
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums')
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireToggleVenacleStoreModal: toggleVenacleStoreModal,
    FireToggleAvatarModal: toggleAvatarModal,

  }
)(WidgetContainer);
