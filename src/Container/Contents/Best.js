import React from 'react';
import AltContainer from 'alt-container';
import connectToStores from 'alt-utils/lib/connectToStores';

import LoginStore from '../../Stores/LoginStore';
import BestPostStore from '../../Stores/BestPostStore';
import ListStore from '../../Stores/UI/ListStore';
import UserStore from '../../Stores/UserStore';
import GnbStore from '../../Stores/GnbStore';

import Posts from '../../Stores/Domain/Posts';
import Users from '../../Stores/Domain/Users';
import Comments from '../../Stores/Domain/Comments';
import SubComments from '../../Stores/Domain/SubComments';
import Clubs from '../../Stores/Domain/Clubs';
import Categories from '../../Stores/Domain/Categories';
import CategoryGroups from '../../Stores/Domain/CategoryGroups';
import Forums from '../../Stores/Domain/Forums';
import Prefixes from '../../Stores/Domain/Prefixes';

import PaginationStore from '../../Stores/UI/PaginationStore';

import Best from '../../Components/Contents/Best';

const BestContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Prefixes, PaginationStore, LoginStore, BestPostStore, UserStore, GnbStore, ListStore, Posts, Users, Comments, SubComments, Categories, Clubs, CategoryGroups, Forums]
  },

  getPropsFromStores() {
    return {
      Posts: Posts.getState(),
      Prefixes: Prefixes.getState(),
      PaginationStore: PaginationStore.getState(),
      Clubs: Clubs.getState(),
      Categories: Categories.getState(),
      CategoryGroups: CategoryGroups.getState(),
      Forums: Forums.getState(),
      Comments: Comments.getState(),
      SubComments: SubComments.getState(),
      Users: Users.getState(),
      LoginStore: LoginStore.getState(),
      ListStore: ListStore.getState(),
      BestPostStore: BestPostStore.getState(),
      UserStore: UserStore.getState(),
      GnbStore: GnbStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Best {...this.props} />)
  }
}));

module.exports = BestContainer;
