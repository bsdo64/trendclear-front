import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const MenuContainer = React.createClass({
  render() {
    const { SearchStore } = this.props;
    const query = SearchStore.get('query');
    return (
      <div id="forum_category">
        {/* Title */}
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'검색 : ' + query}</div>
          </div>
        </div>

        {/* Menu */}
        <menu className="sub_category_list">

          <ul >
            <li >
              <h5 className="">
                <a><i className="fa fa-search"/>{' 검색피드'}</a>
              </h5>

              <div className="sub_category item">
                <Link to={{ pathname: '/search', query: { query: query, order: 'new' } }}>{'최신 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{ pathname: '/search', query: { query: query, order: 'hot' } }}>{'인기 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{ pathname: '/search', query: { query: query, order: 'm_view' } }}>{'많이 본 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{ pathname: '/search', query: { query: query, order: 'm_comment' } }}>{'댓글 많은 글'}</Link>
              </div>
            </li>
          </ul>
        </menu>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  return {
    SearchStore: getUIState('Search')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuContainer);
