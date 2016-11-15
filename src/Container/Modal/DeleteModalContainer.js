import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import DeleteModalBox from '../../Components/Modal/Components/DeleteItem';

const DeleteModalContainer = React.createClass({
  render() {
    return (<DeleteModalBox {...this.props} />)
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
    RemoveModalStore: getUIState('RemoveModal'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteModalContainer);
