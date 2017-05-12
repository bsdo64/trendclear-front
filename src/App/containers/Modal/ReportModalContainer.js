import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import ReportModalBox from '../../components/Modals/Components/Report/index';

import { requestReport } from '../../Actions/Report';

class ReportModalContainer extends React.Component {
  render() {
    return (<ReportModalBox {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    LoginStore: getUIState('Login'),
    ReportStore: getUIState('Report'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

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
