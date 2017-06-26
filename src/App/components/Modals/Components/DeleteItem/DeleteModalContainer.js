import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../../../Selectors/User.js';
import DeleteModalBox from './index';
import { requestDeleteItem } from '../../../../Actions/DeleteItem';

class DeleteModalContainer extends React.Component {
  render() {
    return (<DeleteModalBox {...this.props} />);
  }
}

DeleteModalContainer.propTypes = {
  LoginStore: PropTypes.object.isRequired,
  RemoveModalStore: PropTypes.object.isRequired,
  Posts: PropTypes.object.isRequired,
  Comments: PropTypes.object.isRequired,
  SubComments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    LoginStore: getUIState('Login'),
    RemoveModalStore: getUIState('RemoveModal'),
    UserStore: getUser(StoreState),

    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestDeleteItem: requestDeleteItem,
  }
)(DeleteModalContainer);
