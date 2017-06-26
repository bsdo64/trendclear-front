import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { forumFollowed } from '../../Selectors/User.js';
import style from './index.css';

class FollowingList extends Component {
  constructor(props) {
    super(props);

    this.createForumImage = this.createForumImage.bind(this);
  }
  createForumImage(forum) {
    const src = forum.get('forum_image');
    let dom;

    if (src) {
      dom = (
        <img src={`/image/uploaded/files/avatar1/${src}`} style={{width: 15, height: 15}}/>
      )
    } else {
      dom = (
        <img src={`/images/empty-club-image.png`} style={{width: 14, height: 14}}/>
      )
    }

    return dom;
  }
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
                      {
                        this.createForumImage(forum)
                      }
                    </div>
                    <div>
                      <Link style={{marginBottom: 5, fontSize: '1em', fontWeight: 'regular'}}
                            to={`/club/${forum.get('id')}`}>{forum.get('title')}</Link>
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
