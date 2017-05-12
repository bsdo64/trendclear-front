import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { forumFollowed } from '../../Selectors/User.js';
import style from './index.css';

class FollowingList extends Component {
  render() {

    const { followingForum } = this.props;

    return (
      <div className={cx([style.followingList, style.widgetBox])}>
        <div style={{fontWeight: 'bold', paddingBottom: 5}}>팔로잉 리스트</div>

        <div style={{paddingBottom: 5}}>
          클럽
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMax={300}
          >
            <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
              {followingForum.sortBy(v => v.get('title')).valueSeq().map((forum, i) => {
                return (
                  <li key={i} style={{padding: '3px 0'}}>
                    <div style={{
                      display: 'inline-block',
                      float: 'left',
                      paddingRight: 5,
                    }}>
                      <i className="fa fa-file-o" />
                    </div>
                    <div>
                      <h4 style={{marginBottom: 4, fontSize: '1em'}}>
                        <Link to={`/club/${forum.get('id')}`}>{forum.get('title')}</Link>
                      </h4>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        </div>

        {/*<div style={{paddingBottom: 5}}>
          태그
          <div>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
          </div>
        </div>*/}

{/*
        <div style={{paddingBottom: 5}}>
          유저
          <div>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user"
                 style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user"
                 style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user"
                 style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user"
                 style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user"
                 style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user"
                 style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
          </div>
        </div>
*/}
      </div>
    );
  }
}

FollowingList.propTypes = {
  followingForum: PropTypes.object
};
FollowingList.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    AuthStore: getUIState('Auth'),
    followingForum: forumFollowed(StoreState)
  };
};

export default connect(
  mapStateToProps,
  {

  }
)(FollowingList);
