import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import ForumLeftMenu from '../../Components/ForumLeftMenu';

const MenuContainer = React.createClass({
  render() {
    return (<ForumLeftMenu {...this.props} />)
  }
});

const mapStateToProps = (state, props) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    ListStore: getUIState('List'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums'),
    Collections: getDomainState('Collections'),

    // New Type
    forum: getUIState('Community').get('forum')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuContainer);
