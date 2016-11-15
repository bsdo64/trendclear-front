import React from 'react';
import { Link } from 'react-router';

require('./SigninButton.scss');
const FlatButton = React.createClass({
  render() {
    const { linkTo, text } = this.props;
    return (
      <div id="signin_button" className="widget">
        <Link to={linkTo}>
          <button className="ui primary button fluid">{text}</button>
        </Link>
      </div>
    );
  }
});

export default FlatButton;
