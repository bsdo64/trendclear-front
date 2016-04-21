import React, {Component} from 'react';
import LoginButton from './LoginButton';

class MyArea extends Component {
  render() {
    const { LoginStore } = this.props;
    const isLogin = LoginStore.get('isLogin');
    const openLoginModal = LoginStore.get('openLoginModal');
    // const logout = LoginStore.get('logout');

    // if (logout) {
    //   location.href = '/';
    // }

    return (
      <div className="my_area">
        <div className="ui horizontal list">

          {
            !isLogin &&
            <LoginButton
              openLoginModal={openLoginModal}
            />
          }

          { /* userButtons */ }

        </div>
      </div>
    );
  }
}

export default MyArea;