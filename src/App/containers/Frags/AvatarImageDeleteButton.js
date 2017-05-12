import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  requestUserAvatarImageRemove,
} from '../../Actions/User';

const removeImage = (props) => () => props.FireRequestUserAvatarImageRemove();

const DeleteButton = (props) => {
  return (
    <div className="delete_avatar_btn"
         onClick={removeImage(props)}
    >
      <i className="fa fa-remove"/>
    </div>
  );
};

DeleteButton.propTypes = {
  FireRequestUserAvatarImageRemove: PropTypes.func.isRequired,
};

class AvatarImageDeleteButtonContainer extends React.Component {
  render() {
    return (<DeleteButton {...this.props} />);
  }
}

export default connect(
  null,
  {
    FireRequestUserAvatarImageRemove: requestUserAvatarImageRemove,
  },
)(AvatarImageDeleteButtonContainer);
