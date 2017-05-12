import React from 'react';
import { getLoginUser } from '../Util/func';
import { connect } from 'react-redux';
import PointListBox from '../../components/Contents/PointListBox';
import { UI, Domains } from '../../Reducers/InitialStates';
import {
  requestMoreAccountList,
} from '../../Actions/Point';

class PointList extends React.Component {
  render() {
    return <PointListBox {...this.props } />;
  }
}

PointList.defaultProps = {
  GnbStore: UI.Gnb,
  LoginStore: UI.Login,
  CommunityStore: UI.Community,
  SearchStore: UI.Search,
  ListStore: UI.List,
  PaginationStore: UI.Pagination,
  UserStore: UI.User,

  Users: Domains.Users,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    GnbStore: getUIState('Gnb'),
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    SearchStore: getUIState('Search'),
    ListStore: getUIState('List'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Users: getDomainState('Users'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestMoreAccountList: requestMoreAccountList,
  }
)(PointList);
