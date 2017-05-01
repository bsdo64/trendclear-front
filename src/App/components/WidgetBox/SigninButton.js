import React from 'react';
import { Link } from 'react-router-dom';

require('./SigninButton.scss');
const SigninButton = (
  <div id="signin_button" className="widget">
    <Link to="/signin">
      <button className="ui primary button fluid">지금 가입하세요 !</button>
    </Link>
  </div>
);

export default SigninButton;
