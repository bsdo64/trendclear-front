import React, {Component} from 'react';
import LoginActions from '../../Actions/LoginActions';

const LoginButton = React.createClass({
  displayName: 'LoginButton',
  handleOpenLoginModal() {
    const { openLoginModal } = this.props;
    LoginActions.toggleLoginModal(openLoginModal);
  },
  render() {
    return (
      <div className="item">
        <div className="ui mini button primary"
             onClick={this.handleOpenLoginModal}>
          {'로그인'}
        </div>
      </div>
    );
  }
});

export default LoginButton;