import React from 'react';
import AltContainer from 'alt-container';
import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';

import Community from '../../Components/Contents/Community';

const CommunityContainer = React.createClass({
  render() {
    return (
      <AltContainer
        stores={
        {
          LoginStore,
          CommunityStore
        }
      }
      >
        <Community />
      </AltContainer>
    );
  }
});

module.exports = CommunityContainer;
