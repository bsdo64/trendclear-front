import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import BestCategorySelect from '../../components/LeftMenus/BestCategorySelect';
import { UI, Domains } from '../../Reducers/InitialStates';

import {
  updateFollowingFilter,
  requestSaveFollowingFilter,
} from '../../Actions/Gnb';
import {
  requestCreateCollection,
  requestRemoveForumInCollection,
} from '../../Actions/Collection';

class BestCategoryMenu extends React.Component {
  render() {
    return (
      <div>
        <BestCategorySelect {...this.props} />
      </div>
    );
  }
}

BestCategoryMenu.defaultProps = {
  GnbStore: UI.Gnb,
  ListStore: UI.List,
  UserStore: UI.User,
  Categories: Domains.Categories,
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
    GnbStore: getUIState('Gnb'),
    AuthStore: getUIState('Auth'),
    UserStore: getUser(StoreState),
    Forums: getDomainState('Forums'),
    Categories: getDomainState('Categories'),
    Collections: getDomainState('Collections'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireUpdateFollowingFilter: updateFollowingFilter,
    FireRequestSaveFollowingFilter: requestSaveFollowingFilter,
    FireRequestCreateCollection: requestCreateCollection,
    FireRequestRemoveForumInCollection: requestRemoveForumInCollection,
  }
)(BestCategoryMenu);
