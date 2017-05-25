import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import CollectionLeftMenu from '../../components/LeftMenus/CollectionLeftMenu';
import {
  requestCreateCollection,
  requestAddForumInCollection,
  requestRemoveForumInCollection,
  requestSearchForumToCollectionSubs,
} from '../../Actions/Collection';

class CollectionMenu extends React.Component {
  render() {
    return (<CollectionLeftMenu {...this.props} />);
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
    ListStore: getUIState('List'),
    GnbStore: getUIState('Gnb'),
    AuthStore: getUIState('Auth'),
    CommunityStore: getUIState('Community'),
    UserStore: getUser(StoreState),

    Forums: getDomainState('Forums'),
    Categories: getDomainState('Categories'),
    Collections: getDomainState('Collections'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestCreateCollection: requestCreateCollection,
    FireRequestAddForumInCollection: requestAddForumInCollection,
    FireRequestRemoveForumInCollection: requestRemoveForumInCollection,
    FireRequestSearchForumToCollectionSubs: requestSearchForumToCollectionSubs,
  }
)(CollectionMenu);
