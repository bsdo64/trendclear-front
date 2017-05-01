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
import { getUser, getCollectionList, getForumManaged } from '../../../../Selectors/User';
import { getWidgetBox } from '../../../../Selectors/WidgetBox';

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
    this.searchList = this.searchList.bind(this);
  }

  searchList(e) {
    console.log(e.target.value);
  }

  toggleOpenSearchCollection() {
    this.setState({ openSearchCollection: !this.state.openSearchCollection });
  }

  toggleOpenSearchForum() {
    this.setState({ openSearchForum: !this.state.openSearchForum });
  }

  render() {
    const { collectionList, forumManaged, user, widgetBox} = this.props;
    const toggleStyle = cx(styles.box, {
      [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
    });

    return (
      <div className={styles.gnbSubMenu}>
        <div className={toggleStyle}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>

              <div className={styles.subMenuItem}>
                <Link to="/">
                  <i className="fa fa-star"/>
                  <span>피드</span>
                </Link>
              </div>

              <MyCollections
                user={user}
                collectionList={collectionList}
                openSearchCollection={this.state.openSearchCollection}
                toggleOpenSearchCollection={this.toggleOpenSearchCollection}
                searchList={this.searchList}
              />

              {
                user && user.get('id') &&
                <MyForums
                  user={user}
                  forumManaged={forumManaged}
                  openSearchForum={this.state.openSearchForum}
                  toggleOpenSearchForum={this.toggleOpenSearchForum}
                  searchList={this.searchList}
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
};
HomeMenuBox.defaultProps = {};

const mapStateToProps = (state, props) => {
  const stateStore = state.get('Stores');

  return {
    collectionList: getCollectionList(stateStore, props),
    forumManaged: getForumManaged(stateStore),
    user: getUser(stateStore),
    widgetBox: getWidgetBox(stateStore)
  };
};

export default connect(
  mapStateToProps,
  {},
)(HomeMenuBox);
