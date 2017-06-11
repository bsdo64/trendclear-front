import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import styles from '../../index.css';
import cx from 'classnames';
import MyForums from './components/MyForums/index.js'
import MyCollections from './components/MyCollections/index.js'
import { getUser, getCollectionSearchList, getForumSearchList } from '../../../../Selectors/User';
import { getWidgetBox } from '../../../../Selectors/WidgetBox';
import { addFilter, removeFilter } from '../../../../Actions/Filter';

import WidgetContainer from '../../../../components/WidgetBox/index.js';

class HomeMenuBox extends React.Component {
  constructor() {
    super();

    this.state = {
      openSearchCollection: false,
      openSearchForum: false
    };

    this.toggleOpenSearchCollection = this.toggleOpenSearchCollection.bind(this);
    this.toggleOpenSearchForum = this.toggleOpenSearchForum.bind(this);
    this.searchMyCollectionList = this.searchMyCollectionList.bind(this);
    this.searchMyForumList = this.searchMyForumList.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  componentWillUnmount() {
    this.props.FireRemoveFilter('searchMyForum');
  }

  searchMyCollectionList(e) {
    this.props.FireAddFilter({
      name: 'searchMyCollection',
      filter: e.target.value.trim()
    });
  }

  searchMyForumList(e) {
    this.props.FireAddFilter({
      name: 'searchMyForum',
      filter: e.target.value.trim()
    });
  }

  toggleOpenSearchCollection() {
    this.setState({ openSearchCollection: !this.state.openSearchCollection }, () => {
      if (!this.state.openSearchCollection) {
        this.props.FireRemoveFilter('searchMyCollection');
      }
    });
  }

  toggleOpenSearchForum() {
    this.setState({ openSearchForum: !this.state.openSearchForum }, () => {
      if (!this.state.openSearchForum) {
        this.props.FireRemoveFilter('searchMyForum');
      }
    });
  }

  isActive(location) {
    return location.pathname === '/';
  }

  render() {
    const { location, collectionList, forumManaged, user, widgetBox} = this.props;
    const toggleStyle = cx(styles.box, {
      [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
    });
    const activeStyle = cx(styles.subMenuItem, {
      [styles.activeButton]: this.isActive(location)
    });

    return (
      <div className={styles.gnbSubMenu}>
        <div className={toggleStyle}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>

              <div className={activeStyle}>
                <Link to="/" >
                  <i className="fa fa-star"/>
                  <span>피드</span>
                </Link>
              </div>

              <MyCollections
                user={user}
                collectionList={collectionList}
                openSearchCollection={this.state.openSearchCollection}
                toggleOpenSearchCollection={this.toggleOpenSearchCollection}
                searchList={this.searchMyCollectionList}
                location={location}
              />

              {
                user && user.get('id') &&
                <MyForums
                  user={user}
                  forumManaged={forumManaged}
                  openSearchForum={this.state.openSearchForum}
                  toggleOpenSearchForum={this.toggleOpenSearchForum}
                  searchList={this.searchMyForumList}
                />
              }
            </div>

          </Scrollbars>
        </div>

        <Route component={WidgetContainer}/>
      </div>
    );
  }
}

HomeMenuBox.propTypes = {
  collectionList: PropTypes.object.isRequired,
  forumManaged: PropTypes.object.isRequired,
  user: PropTypes.object,
  widgetBox: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
HomeMenuBox.defaultProps = {};

const mapStateToProps = (state, props) => {
  const StoreState = state.get('Stores');

  return {
    collectionList: getCollectionSearchList(StoreState, props),
    forumManaged: getForumSearchList(StoreState),
    user: getUser(StoreState),
    widgetBox: getWidgetBox(StoreState)
  };
};

export default connect(
  mapStateToProps,
  {
    FireAddFilter: addFilter,
    FireRemoveFilter: removeFilter,
  },
)(HomeMenuBox);
