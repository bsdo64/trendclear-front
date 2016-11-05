import React, {Component} from 'react';
import LoginActions from '../../Actions/LoginActions';

const LoginButton = React.createClass({
  displayName: 'LoginButton',
  handleOpenLoginModal() {
    const { location } = this.props;
    LoginActions.toggleLoginModal({
      contentType: 'Login',
      location: location.pathname + location.search
    });
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