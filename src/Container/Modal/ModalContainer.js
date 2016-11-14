import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../Components/Modal';

const DefaultModalContainer = React.createClass({
  render() {
    return (<Modal {...this.props} />)
  }
});


const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  return {
    ModalStore: getUIState('Modal')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultModalContainer);
