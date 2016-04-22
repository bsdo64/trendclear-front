import React from 'react';
import AltContainer from 'alt-container';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';

import WidgetBox from '../../Components/WidgetBox';

var WidgetContainer = React.createClass({
  displayName: 'WidgetContainer',
  render() {
    return (
      <AltContainer
        stores={
        {
          LoginStore,
          UserStore
        }
      }
      >
        <WidgetBox />
      </AltContainer>
    );
  }
});

module.exports = WidgetContainer;
