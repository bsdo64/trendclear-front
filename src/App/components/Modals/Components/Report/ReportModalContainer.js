import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../../Selectors/User.js';
import ReportModalBox from './index';

import { requestReport } from '../../../../Actions/Report';

class ReportModalContainer extends React.Component {
  render() {
    return (<ReportModalBox {...this.props} />);
  }
}

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
    ReportStore: getUIState('Report'),
    UserStore: getUser(StoreState),

    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestReport: requestReport,
  }
)(ReportModalContainer);
