import React from 'react';
import alt from '../../Utils/alt';
import connectToStores from 'alt-utils/lib/connectToStores';

import Best from '../../Components/Contents/Best';

const BestContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      // UI Stores
      alt.getStore('LoginModalStore'),
      alt.getStore('AuthStore'),
      alt.getStore('PaginationStore'),
      alt.getStore('ListStore'),

      // Domain Stores
      alt.getStore('Posts'),
      alt.getStore('Users'),
      alt.getStore('Forums'),

      alt.getStore('GnbStore')
    ]
  },

  getPropsFromStores() {
    return {
      AuthStore:        alt.getStore('AuthStore').getState(),
      PaginationStore:  alt.getStore('PaginationStore').getState(),
      ListStore:        alt.getStore('ListStore').getState(),
      LoginModalStore:  alt.getStore('LoginModalStore').getState(),

      Forums:           alt.getStore('Forums').getState(),
      Users:            alt.getStore('Users').getState(),
      Posts:            alt.getStore('Posts').getState(),

      GnbStore:         alt.getStore('GnbStore').getState()
    }
  }
}, React.createClass({
  render() {
    return (<Best listName="bestPostList"
                  {...this.props} />)
  }
}));

module.exports = BestContainer;
