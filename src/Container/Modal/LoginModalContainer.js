import React from 'react';
import AltContainer from 'alt-container';
import LoginStore from '../../Stores/LoginStore';

import LoginModalBox from '../../Components/LoginModalBox';

var LoginModalContainer = React.createClass({
  displayName: 'LoginModalContainer',
  render() {

    return (
      <AltContainer
        stores={
        {
          LoginStore
        }
      }
      >
        <LoginModalBox />
      </AltContainer>
    );
  }
});

module.exports = LoginModalContainer;
