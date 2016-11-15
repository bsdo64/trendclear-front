import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import MyArea from '../../Components/MyArea';
import { Noti, Point } from '../../Utils/Socket';

const MyMenuContainer = React.createClass({
  componentDidMount() {
    "use strict";

    const { LoginStore } = this.props;

    if (LoginStore.get('isLogin')) {
      Noti.emit('join_room');
      Point.emit('join_room');
    }

  },
  render() {
    return (<MyArea {...this.props} />)
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
    Notis: getDomainState('Notis'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMenuContainer);
