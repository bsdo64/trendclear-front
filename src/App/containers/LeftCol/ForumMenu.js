import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import ForumLeftMenu from '../../components/LeftMenus/ForumLeftMenu';
import { UI, Domains } from '../../Reducers/InitialStates';
import {
  requestCreateCollection,
  requestAddForumInCollection,
  requestRemoveForumInCollection,
  requestSearchForumToCollectionSubs,
} from '../../Actions/Collection';

class MenuContainer extends React.Component {
  render() {
    return (<ForumLeftMenu {...this.props} />);
  }
}

MenuContainer.defaultProps = {
  ListStore: UI.List,
  UserStore: UI.User,

  Forums: Domains.Forums,
  Collections: Domains.Collections,
};

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
    UserStore: getUser(StoreState),

    Forums: getDomainState('Forums'),
    Collections: getDomainState('Collections'),

    // New Type
    forum: getUIState(['Community', 'forum']),
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
)(MenuContainer);
