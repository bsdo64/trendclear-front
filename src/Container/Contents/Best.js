import React from 'react';
import AltContainer from 'alt-container';
import LoginStore from '../../Stores/LoginStore';
import BestPostStore from '../../Stores/BestPostStore';

import Best from '../../Components/Contents/Best';

const BestContainer = React.createClass({
  render() {
    return (
      <AltContainer
        stores={
        {
          LoginStore,
          BestPostStore
        }
      }
      >
        <Best />
      </AltContainer>
    );
  }
});

module.exports = BestContainer;
