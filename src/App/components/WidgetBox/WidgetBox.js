import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from './FlatButton';
import TrendBox from './TrendBox';

require('./index.scss');
class WidgetBox extends Component {
  render() {
    const {
      LoginStore, user
    } = this.props;
    const isLogin = LoginStore.get('isLogin');

    return (
      <div id="section_cldmm">

        {
          isLogin && user &&
          <TrendBox
            user={user}
            {...this.props}
          />
        }

        {
          !isLogin &&
          [
            <FlatButton
              key="1"
              linkTo="/signin"
              text="지금 가입하세요 !"
            />,
          ]
        }
      </div>
    );
  }
}

WidgetBox.propTypes = {
  widgetBox: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  LoginStore: PropTypes.object.isRequired,
  InventoryStore: PropTypes.object.isRequired,
  ShoppingStore: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  Forums: PropTypes.object.isRequired,
  Venatems: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
  Inventories: PropTypes.object,
  FireToggleVenacleStoreModal: PropTypes.func.isRequired,
  FireToggleAvatarModal: PropTypes.func.isRequired,
  FireShowItemInfo: PropTypes.func.isRequired,
  FireRequestShoppingItemInit: PropTypes.func.isRequired,
  FireToggleShowInventory: PropTypes.func.isRequired,
  FireToggleTrendBox: PropTypes.func.isRequired,
};

export default WidgetBox;
