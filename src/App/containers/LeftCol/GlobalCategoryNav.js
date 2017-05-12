import React from 'react';
import { connect } from 'react-redux';
import {
  toggleGnbPanel,
  openSideCategory,
  openForumMeta,
} from '../../Actions/Gnb';
import CategoryNav from '../../components/CategoryNav';

class LeftColCategoryNav extends React.Component{
  render() {
    return (<CategoryNav {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    GnbStore: getUIState('Gnb'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireToggleGnbPanel: toggleGnbPanel,
    FireOpenSideCategory: openSideCategory,
    FireOpenForumMeta: openForumMeta,
  }
)(LeftColCategoryNav);
