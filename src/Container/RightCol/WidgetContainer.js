import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import WidgetBox from '../../Components/WidgetBox';

const WidgetContainer = React.createClass({
  render() {

    return (<WidgetBox {...this.props} />)
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
    ShoppingStore: getUIState('Shopping'),
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetContainer);
