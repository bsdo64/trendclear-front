import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import FlatButton from './FlatButton';
import TrendBox from './TrendBox';
import qs from 'qs';

require('./index.scss');
class WidgetBox extends Component {
  render() {
    const {
      LoginStore, UserStore, Forums, location,
    } = this.props;
    const isLogin = LoginStore.get('isLogin');
    const user = {
      user: UserStore.get('user'),
      trendbox: UserStore.get('trendbox'),
      profile: UserStore.get('profile'),
      icon: UserStore.get('icon'),
      grade: UserStore.get('grade'),
      skills: UserStore.get('skills'),
      forumCreated: UserStore.get('forumCreated'),
      forumManaged: UserStore.get('forumManaged'),
      inventories: UserStore.get('inventories'),
    };

    return (
      <div id="section_cldmm">

        {
          isLogin && user &&
          <TrendBox
            user={user}
            {...this.props}
          />
        }

        {
          isLogin && user && user.forumManaged && user.forumManaged.size > 0 &&
          [
            <div key="1" id="my_forum">
              <div className="header">
                내 게시판
              </div>
              <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                autoHideDuration={200}
                autoHeight
                autoHeightMin={50}
                autoHeightMax={200}
                universal={true}
              >
                <div className="ui list forum_created_list">
                  {
                    user.forumManaged
                      .map(forumId => Forums.get(forumId.toString()))
                      .sortBy(item => item.get('title'))
                      .map(forum => {
                        const styleActive = cx('', {
                          active: qs.parse(location.search.slice(1)).forumId ===
                          forum.get('id').toString(),
                        });

                        return (
                          <div key={forum.get('id')} className="item">
                            <i className="ui inbox icon"/>
                            <div className="content">
                              <div className="header">
                                <Link
                                  to={`/club/${forum.get('id')}`}
                                  className={styleActive}>
                                  {forum.get('title')}
                                  {
                                    !user.forumCreated.includes(
                                      forum.get('id')) &&
                                    ' (매)'
                                  }
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  }
                </div>

              </Scrollbars>
            </div>,
          ]
        }

        {
          !isLogin &&
          [
            <FlatButton
              key="1"
              linkTo="/signin"
              text="지금 가입하세요 !"
            />,
          ]
        }
      </div>
    );
  }
}

WidgetBox.propTypes = {
  LoginStore: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
  InventoryStore: PropTypes.object.isRequired,
  ShoppingStore: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  Forums: PropTypes.object.isRequired,
  Venatems: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
  Inventories: PropTypes.object,
  FireToggleVenacleStoreModal: PropTypes.func.isRequired,
  FireToggleAvatarModal: PropTypes.func.isRequired,
  FireShowItemInfo: PropTypes.func.isRequired,
  FireRequestShoppingItemInit: PropTypes.func.isRequired,
  FireToggleShowInventory: PropTypes.func.isRequired,
};

export default WidgetBox;
