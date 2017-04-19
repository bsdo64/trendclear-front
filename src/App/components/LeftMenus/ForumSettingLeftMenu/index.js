import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

require('./index.scss');
const ForumSettingLeftMenu = props => {
  const {CommunityStore} = props;
  const forum = CommunityStore.get('forum');

  if (forum) {
    const forumId = forum.get('id');
    const creator = forum.get('creator');
    if (creator) {

      return (
        <div id="forum_category">
          {/* Title */}
          <div id="sub_category">
            <div className="sub_category_button">
              <div className="sub_category_text">
                <Link to={`/community?forumId=${forum.get('id')}`}>{forum.get(
                  'title') + ' / 설정'}</Link>
              </div>
            </div>
          </div>

          {/* Menu */}
          <menu className="sub_category_list" key={forum.get('id')}>

            <ul className="forum_setting_menu">
              <li >
                <h5 className="">
                  {' 기본 설정'}
                </h5>

                <div className="sub_category item">
                  <Link
                    to={{
                      pathname: '/community/settings/foruminfo',
                      search: `?forumId=${forumId}`,
                    }}>{'게시판 정보'}</Link>
                </div>
                <div className="sub_category item">
                  <Link
                    to={{
                      pathname: '/community/settings/forumprefix',
                      search: `?forumId=${forumId}`,
                    }}>{'말머리'}</Link>
                </div>
                {/*<div className="sub_category item">*/}
                {/*<Link to={{pathname: '/community/settings/forumurl', search: `?forumId=${forumId}`}}>{'게시판 주소'}</Link>*/}
                {/*</div>*/}
              </li>
              <li >
                <h5 className="">
                  {' 컨텐츠 설정'}
                </h5>

                <div className="sub_category item">
                  <Link
                    to={{
                      pathname: '/community/settings/announce',
                      search: `?forumId=${forumId}`,
                    }}>{'공지글 설정'}</Link>
                </div>
                {/*<div className="sub_category item">*/}
                {/*<Link to={{pathname: '/community/settings/writepost', search: `?forumId=${forumId}`}}>{'글 쓰기 설정'}</Link>*/}
                {/*</div>*/}
                {/*<div className="sub_category item">*/}
                {/*<Link to={{pathname: '/community/settings/writecomment', search: `?forumId=${forumId}`}}>{'댓글 쓰기 설정'}</Link>*/}
                {/*</div>*/}
                {/*<div className="sub_category item">*/}
                {/*<Link to={{pathname: '/community/settings/share', search: `?forumId=${forumId}`}}>{'퍼가기 설정'}</Link>*/}
                {/*</div>*/}
              </li>
              {/*<li >*/}
              {/*<h5 className="">*/}
              {/*{' 이벤트 설정'}*/}
              {/*</h5>*/}

              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/promotion', search: `?forumId=${forumId}`}}>{'이벤트 글 등록'}</Link>*/}
              {/*</div>*/}
              {/*</li>*/}
              <li >
                <h5 className="">
                  {' 회원 설정'}
                </h5>
                <div className="sub_category item">
                  <Link
                    to={{
                      pathname: '/community/settings/managers',
                      search: `?forumId=${forumId}`,
                    }}>{'매니저 설정'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{
                    pathname: '/community/settings/banlist',
                    search: `?forumId=${forumId}`,
                  }}>{'게시판 벤 유저 설정'}</Link>
                </div>
              </li>
              {/*<li >*/}
              {/*<h5 className="">*/}
              {/*{' 스팸 설정'}*/}
              {/*</h5>*/}

              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/spams', search: `?forumId=${forumId}`}}>{'스팸 설정'}</Link>*/}
              {/*</div>*/}
              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/spamreports', search: `?forumId=${forumId}`}}>{'스팸 글 신고'}</Link>*/}
              {/*</div>*/}
              {/*</li>*/}
              {/*<li >*/}
              {/*<h5 className="">*/}
              {/*{' 통계'}*/}
              {/*</h5>*/}

              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/stat/forum', search: `?forumId=${forumId}`}}>{'게시판'}</Link>*/}
              {/*</div>*/}
              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/stat/views', search: `?forumId=${forumId}`}}>{'조회수'}</Link>*/}
              {/*</div>*/}
              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/stat/visitors', search: `?forumId=${forumId}`}}>{'방문자 수'}</Link>*/}
              {/*</div>*/}
              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/stat/likerank', search: `?forumId=${forumId}`}}>{'좋아요 순위'}</Link>*/}
              {/*</div>*/}
              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/stat/commentrank', search: `?forumId=${forumId}`}}>{'댓글 순위'}</Link>*/}
              {/*</div>*/}
              {/*<div className="sub_category item">*/}
              {/*<Link to={{pathname: '/community/settings/stat/viewrank', search: `?forumId=${forumId}`}}>{'조회수 순위'}</Link>*/}
              {/*</div>*/}
              {/*</li>*/}
            </ul>
          </menu>
        </div>
      );
    }
  }

  return (
    <div id="forum_category">
      {/* Title */}
      <div id="sub_category">
        <div className="sub_category_button">
          <div className="sub_category_text">{''}</div>
        </div>
      </div>

      {/* Menu */}
      <menu className="sub_category_list">

        <ul >
          <li >
            <h5 className="">
              <Link to={`/community/settings?forumId=`}>
                {' 기본 설정'}
              </Link>
            </h5>

            <div className="sub_category item">
              <Link to={'/community/settings'}>{'게시판 정보'}</Link>
            </div>
            <div className="sub_category item">
              <Link
                to={'/community/settings/banlist'}>{'벤 리스트'}</Link>
            </div>
            <div className="sub_category item">
              <Link to={'/community/settings'}>{'공지 글'}</Link>
            </div>
            <div className="sub_category item">
              <Link to={'/community/settings'}>{'통계'}</Link>
            </div>
          </li>
        </ul>
      </menu>
    </div>
  );
};

ForumSettingLeftMenu.displayName = 'ForumSettingLeftMenu';
ForumSettingLeftMenu.propTypes = {
  CommunityStore: PropTypes.object.isRequired,
};

export default ForumSettingLeftMenu;
