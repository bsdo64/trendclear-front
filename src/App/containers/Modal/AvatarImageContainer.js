import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import AvatarImageModal from '../../components/Modals/Components/AvatarImage';
import { requestUserAvatarImageUpload } from '../../Actions/User';

class AvatarImageContainer extends React.Component {
  render() {
    return (<AvatarImageModal {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
    UserStore: getUser(StoreState),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestUserAvatarImageUpload: requestUserAvatarImageUpload,
  }
)(AvatarImageContainer);
