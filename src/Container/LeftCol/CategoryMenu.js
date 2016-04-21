import React from 'react';
import AltContainer from 'alt-container';
import GnbStore from '../../Stores/GnbStore';

import CategoryList from '../../Components/CategoryList';

var MenuContainer = React.createClass({
  displayName: 'MenuContainer',
  render() {
    return (
      <AltContainer
        stores={
        {
          GnbStore
        }
      }
      >
        <CategoryList />
      </AltContainer>
    );
  }
});

module.exports = MenuContainer;
