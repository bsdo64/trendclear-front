import React from 'react';

require('./SigninButton.scss');
const SigninButton = React.createClass({
  render() {
    return (
      <div id="signin_button" className="widget">
        <a href="/signin">
          <button className="ui primary button fluid">지금 가입하세요 !</button>
        </a>
      </div>
    );
  }
});

export default SigninButton;
