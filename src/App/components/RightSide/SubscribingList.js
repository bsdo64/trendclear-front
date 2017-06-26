import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { getCurrentCollection, getSubscribingForumList } from '../../Selectors/Collection';
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
        <img src={`/images/empty-club-image.png`} style={{width: 15, height: 15}}/>
      )
    }

    return dom;
  }

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
                          {
                            this.createForumImage(forum)
                          }
                        </div>
                        <div>
                          <Link style={{marginBottom: 5, fontSize: '1em', fontWeight: 'regular'}}
                                to={`/club/${forum.get('id')}`}>{forum.get('title')}</Link>
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
