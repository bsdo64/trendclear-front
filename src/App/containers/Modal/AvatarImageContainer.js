import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import AvatarImageModal from '../../components/Modals/Components/AvatarImage';
import { requestUserAvatarImageUpload } from '../../Actions/User';

class AvatarImageContainer extends React.Component {
  render() {
    return (<AvatarImageModal {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestUserAvatarImageUpload: requestUserAvatarImageUpload,
  }
)(AvatarImageContainer);
