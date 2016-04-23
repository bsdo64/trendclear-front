import React from 'react';
import AltContainer from 'alt-container';
import SigninStore from '../../Stores/SigninStore';

import Signin from '../../Components/Contents/Signin';

const SigninContainer = React.createClass({
  render() {
    return (
      <AltContainer
        stores={
        {
          SigninStore
        }
      }
      >
        <Signin />
      </AltContainer>
    );
  }
});

module.exports = SigninContainer;
