import React from 'react';
import AltContainer from 'alt-container';
import LoginStore from '../../Stores/LoginStore';

import MyArea from '../../Components/MyArea';

var MyMenuContainer = React.createClass({
  displayName: 'MyMenuContainer',
  render() {
    return (
      <AltContainer
        stores={
        {
          LoginStore
        }
      }
      >
        <MyArea />
      </AltContainer>
    );
  }
});

module.exports = MyMenuContainer;
