import React from 'react';
import {connect} from 'react-redux';
import {getLoginUser} from '../Util/func';

import ReportModalBox from '../../Components/Modal/Components/Report/index';

const ReportModalContainer = React.createClass({
  render() {
    return (<ReportModalBox {...this.props} />)
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
    ReportStore: getUIState('Report'),
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
)(ReportModalContainer);
