import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import BestCategorySelect from '../../Components/BestCategorySelect';

const BestCategoryMenu = React.createClass({
  render() {
    return (
      <div>
        <BestCategorySelect {...this.props} />
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    ListStore: getUIState('List'),
    GnbStore: getUIState('Gnb'),
    AuthStore: getUIState('Auth'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
    Forums: getDomainState('Forums'),
    Categories: getDomainState('Categories'),
    Collections: getDomainState('Collections')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(BestCategoryMenu);
