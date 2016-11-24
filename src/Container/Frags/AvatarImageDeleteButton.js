import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  requestUserAvatarImageRemove
} from '../../Actions/User';

const DeleteButton = (props) => {
  const removeImage = () => props.FireRequestUserAvatarImageRemove();

  return (
    <div className="delete_avatar_btn"
         onClick={removeImage}
    >
      <i className="fa fa-remove"/>
    </div>
  );
};

DeleteButton.propTypes = {
  FireRequestUserAvatarImageRemove: PropTypes.func.isRequired,
};

const AvatarImageDeleteButtonContainer = React.createClass({
  render() {
    return (<DeleteButton {...this.props} />)
  }
});

module.exports = connect(
  null,
  {
    FireRequestUserAvatarImageRemove: requestUserAvatarImageRemove,
  }
)(AvatarImageDeleteButtonContainer);
