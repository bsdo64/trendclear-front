import React from 'react';
import {connect} from 'react-redux';
import {getLoginUser} from '../Util/func';

import AvatarImageModal from '../../Components/Modal/Components/AvatarImage';

const AvatarImageContainer = React.createClass({
  render() {
    return (<AvatarImageModal {...this.props} />)
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
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarImageContainer);
