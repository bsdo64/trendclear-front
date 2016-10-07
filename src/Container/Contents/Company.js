import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';
import UserStore from '../../Stores/UserStore';

import Posts from '../../Stores/Domain/Posts';
import Comments from '../../Stores/Domain/Comments';
import SubComments from '../../Stores/Domain/SubComments';
import Users from '../../Stores/Domain/Users';
import Forums from '../../Stores/Domain/Forums';
import Prefixes from '../../Stores/Domain/Prefixes';
import Collections from '../../Stores/Domain/Collections';

import ListStore from '../../Stores/UI/ListStore';
import AuthStore from '../../Stores/UI/AuthStore';
import PaginationStore from '../../Stores/UI/PaginationStore';
import LoginModalStore from '../../Stores/UI/LoginModalStore';

import Company from '../../Components/Contents/Company';

const CompanyContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      // Old
      LoginStore,
      CommunityStore,
      UserStore,

      // UI Stores
      AuthStore,
      ListStore,
      LoginModalStore,
      PaginationStore,

      // Domain Stores
      Posts,
      Comments,
      SubComments,
      Users,
      Prefixes,
      Forums,
      Collections
    ]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      CommunityStore: CommunityStore.getState(),
      UserStore: UserStore.getState(),

      // UI Stores
      AuthStore: AuthStore.getState(),
      ListStore: ListStore.getState(),
      LoginModalStore: LoginModalStore.getState(),
      PaginationStore: PaginationStore.getState(),

      // Domain Stores
      Posts: Posts.getState(),
      Comments: Comments.getState(),
      SubComments: SubComments.getState(),
      Users: Users.getState(),
      Prefixes: Prefixes.getState(),
      Forums: Forums.getState(),
      Collections: Collections.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<Company {...this.props} />)
  }
}));

module.exports = CompanyContainer;
