import React from 'react';
import AltContainer from 'alt-container';
import connectToStores from 'alt-utils/lib/connectToStores';

import GnbStore from '../../Stores/GnbStore';

import Posts from '../../Stores/Domain/Posts';
import Users from '../../Stores/Domain/Users';
import Clubs from '../../Stores/Domain/Clubs';
import Categories from '../../Stores/Domain/Categories';
import CategoryGroups from '../../Stores/Domain/CategoryGroups';
import Forums from '../../Stores/Domain/Forums';

import ListStore from '../../Stores/UI/ListStore';
import AuthStore from '../../Stores/UI/AuthStore';
import PaginationStore from '../../Stores/UI/PaginationStore';
import LoginModalStore from '../../Stores/UI/LoginModalStore';

import Best from '../../Components/Contents/Best';

const BestContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      // UI Stores
      LoginModalStore,
      AuthStore,
      PaginationStore,
      ListStore,

      // Domain Stores
      Posts,
      Users,
      Categories,
      Clubs,
      CategoryGroups,
      Forums,

      GnbStore
    ]
  },

  getPropsFromStores() {
    return {
      AuthStore:        AuthStore.getState(),
      PaginationStore:  PaginationStore.getState(),
      ListStore:        ListStore.getState(),
      LoginModalStore:  LoginModalStore.getState(),

      Clubs:            Clubs.getState(),
      Categories:       Categories.getState(),
      CategoryGroups:   CategoryGroups.getState(),
      Forums:           Forums.getState(),
      Users:            Users.getState(),
      Posts:            Posts.getState(),

      GnbStore:         GnbStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Best {...this.props} />)
  }
}));

module.exports = BestContainer;
