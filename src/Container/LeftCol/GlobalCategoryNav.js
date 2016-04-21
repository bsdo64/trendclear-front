import React from 'react';
import AltContainer from 'alt-container';
import GnbStore from '../../Stores/GnbStore';

import CategoryNav from '../../Components/CategoryNav';

var LeftColCategoryNav = React.createClass({
  displayName: 'LeftColCategoryNav',
  render() {
    return (
      <AltContainer
        stores={
        {
          GnbStore
        }
      }
      >
        <CategoryNav />
      </AltContainer>
    );
  }
});

module.exports = LeftColCategoryNav;
