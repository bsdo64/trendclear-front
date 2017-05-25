import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { getCurrentCollection, getSubscribingForumList } from '../../Selectors/Collection';
import style from './index.css';

class FollowingList extends Component {
  render() {

    const { currentCollection, subscribingForumList } = this.props;

    return (
      <div className={cx([style.followingList, style.widgetBox])}>
        <div style={{fontWeight: 'bold', paddingBottom: 5}}>{currentCollection.get('title')}의 구독</div>

        <div style={{paddingBottom: 5}}>
          클럽
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMax={300}
          >
            <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
              {
                subscribingForumList
                  .sortBy(v => v.get('title'))
                  .map((forum, i) => {
                    return (
                      <li key={i} style={{padding: '5px 0'}}>
                        <div style={{
                          display: 'inline-block',
                          float: 'left',
                          paddingRight: 5,
                        }}>
                          <img src="http://placehold.it/16x16"/>
                        </div>
                        <div>
                          <h4 style={{marginBottom: 4, fontSize: '1em'}}>
                            <Link to={`/club/${forum.get('id')}`}>{forum.get('title')}</Link>
                          </h4>
                        </div>
                      </li>
                    )
                  })
              }
            </ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

FollowingList.propTypes = {
  currentCollection: PropTypes.object,
  subscribingForumList: PropTypes.object,
};
FollowingList.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    AuthStore: getUIState('Auth'),
    currentCollection: getCurrentCollection(StoreState),
    subscribingForumList: getSubscribingForumList(StoreState)
  };
};

export default connect(
  mapStateToProps,
  {

  }
)(FollowingList);
