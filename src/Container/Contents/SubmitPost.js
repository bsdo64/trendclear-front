import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Submit from '../../Components/Contents/Submit';

const SubmitPostContainer = React.createClass({
  render() {
    return (<Submit {...this.props} />);
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
    SubmitStore: getUIState('Submit'),
    AuthStore: getUIState('Auth'),
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
    Posts: getDomainState('Posts')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitPostContainer);
