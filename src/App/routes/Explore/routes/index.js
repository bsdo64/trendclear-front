import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './main.css';
import postStyle from './post.css';

import { fromJS } from 'immutable';
const postArr = fromJS([
  {
    link_id: "BJf6jejdl1486715833650",
    scrap_count: 0,
    width: 599,
    height: 191,
    like_count: 2,
    prefix_id: null,
    created_at: "5달 전",
    author: 162,
    author_id: 162,
    comment_count: 3,
    prefix: null,
    view_count: 4,
    has_video: null,
    updated_at: null,
    title: "asdv",
    deleted: false,
    content: '<p class="">asdvasdfe</p>',
    forum_id: 162,
    id: 100354,
    has_img: null,
    forum: {
      follow_count: 13,
      subs_count: -21,
      using: true,
      created_at: "2016-09-06T12:01:57.167Z",
      sub_header: "Geek한 자료",
      creator_id: 1,
      order: "1",
      post_count: 58,
      title: "Geek",
      id: 162,
      rule: "Geek에 관한 모든 자료는 상관 없음asdvasdfeasdvasdfee!!! wrwerasdv!! ![GitHub Logo](http://gfmarket.phinf.naver.net/line_choco/original_9.png?type=p50_50) Format: ![Alt Text](https://scontent-icn1-1.xx.fbcdn.net/v/t31.0-0/p526x296/16423087_2090207207784933_5694604550417681079_o.png?oh=38c6544b34bb7ad2878fee2a3d96d48a&oe=5908D46C)",
      description: "Geek 짤방 자료 공유 게시판입니다.!",
      forum_image: "upload_fe37e5c0c6135239269d08ec2401b6bd.png",
    }
  }
]);

const PostItem = props => {
  const { item } = props;

  let postImg;
  if (item.has_img) {
    postImg = <img src="/images/empty-club-image.png" className={postStyle.td_m}/>;
  }

  return (
    <div className={postStyle.post_item}>
      {postImg}
      <div className={postStyle.header}>
        <div className={postStyle.club_name}>
          <Link to={`/club/${item.getIn(['forum', 'id'])}`}>{item.getIn(['forum', 'title'])}</Link>
        </div>
        <div className={postStyle.title}>
          <Link to={`/club/${item.getIn(['forum', 'id'])}?postId=${item.get('id')}`}
                target="_blank"
                rel='noopener noreferrer'>
            {item.get('title')}
          </Link>
        </div>
        <div className={postStyle.meta}>
          <span>Nick1</span>
          <span className={postStyle.divider}>{' | '}</span>
          <span>{item.get('created_at')}</span>
        </div>
      </div>
      <div className={postStyle.counts}>
        <span style={{ paddingRight: 10 }}><i className='fa fa-heart'/> {item.get('like_count')}</span>
        <span><i className='fa fa-comments-o'/> {item.get('comment_count')}</span>
      </div>
    </div>
  )
};

const MainCardListItem = (props) => {
  const { itemType, listItemStyle, item} = props;

  let Item;
  switch (itemType) {
    case 'post':
      Item = PostItem;
      break;
    default:
      Item = PostItem;
      break;
  }

  return <li className={listItemStyle}>
    <Item item={item} />
  </li>
};

const MainCardList = (props) => {
  const { itemType, listType, items } = props;
  const listItemStyle = listType !== 'flex' ? style.ex_list_item : style.ex_list_item;
  return (
    <ul className={style.ex_list}>
      {items.map((v, i) => {
        return (
          <MainCardListItem
            key={i}
            itemType={itemType}
            listItemStyle={listItemStyle}
            item={v}
          />
        )
      })}
    </ul>
  )
};

const MainCard = (props) => {
  return (
    <div className={style.explore_card}>
      <div style={{ background: '#fff', padding: 10 }}>
        <h4>{props.title}</h4>
        {props.children}
        <Link to={`/explore/${props.type}`} className={style.more_btn}>
          <div>더 보기</div>
        </Link>
      </div>
    </div>
  )
};

class Main extends Component {
  render() {
    return (
      <div style={{ padding: 10 }}>
        <h3><i className="fa fa-globe"/> 탐색</h3>

        {/* 포스트 */}
        <MainCard type="posts" title="포스트">
          <MainCardList itemType="post" listType="flex" items={postArr} />
        </MainCard>

        {/* 클럽 */}
        <MainCard title="클럽" type="clubs">
          <ul className={style.ex_list}>
            <li className={style.ex_list_item_flex}>
              <div className="tl_default" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', paddingRight: 10, }} className="td_a">
                  <img
                    src="https://s.pstatic.net/static/www/mobile/edit/2017/0714/cropImg_166x108_100480090185526590.png"
                    width="30" height="30" alt="" className="td_m"/>
                </div>
                <div className="td_t" style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#095e6b',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  여름엔 '일본뇌염'예방접종!  보건소 무료 이용 팁
                  여름엔 '일본뇌염'예방접종!  보건소 무료 이용 팁
                  여름엔 '일본뇌염'예방접종!  보건소 무료 이용 팁
                </div>
                <div className="td_t" style={{
                  color: '#095e6b',
                  paddingLeft: 10,
                  flex: '1 0 auto'
                }}>
                  <span style={{ paddingRight: 10 }}><i className='fa fa-star'/> 140</span>
                  <span><i className='fa fa-file-o'/> 140</span>
                </div>
              </div>
              <div className="td_ow" style={{ paddingTop: 5 }}>
                <span className="td_o">무료로 챙기는 보건소 꿀팁</span>
              </div>
            </li>
          </ul>
        </MainCard>

        {/* 컬렉션 */}
        <MainCard title="컬렉션" type="collections">
          <ul className={style.ex_list}>
            <li className={style.ex_list_item}>
              <div className="tl_default" style={{ display: 'flex', alignItems: 'center', }}>
                  <span className="td_t" style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#095e6b',
                    flex: 'auto',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    여름엔 '일본뇌염'예방접종!  보건소 무료 이용 팁 여름엔 '일본뇌염'예방접종!  보건소 무료 이용 팁 여름엔 '일본뇌염'예방접종!  보건소 무료 이용 팁
                  </span>
                <span className="td_t" style={{
                  color: '#095e6b',
                  paddingLeft: 10,
                  flex: '1 0 auto'
                }}>
                    <span style={{ paddingRight: 10 }}><i className='fa fa-file-o'/> 140</span>
                    <span><i className="fa fa-files-o" aria-hidden="true"></i> 140</span>
                  </span>
              </div>
              <div style={{paddingTop: 10}}>
                무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁
              </div>
              <div className="td_ow" style={{ paddingTop: 5 }}>
                <ul className="td_o" style={{ display: 'inline', margin: 0, padding: 0, listStyle: 'none', }}>
                  <li style={{
                    display: 'inline',
                    marginRight: 5,
                    padding: '2px 3px',
                    background: '#058294',
                    color: '#eee',
                    fontSize: '11px',
                    borderRadius: '2px',
                  }}>더이상은</li>
                  <li style={{
                    display: 'inline',
                    marginRight: 5,
                    padding: '2px 3px',
                    background: '#058294',
                    color: '#eee',
                    fontSize: '11px',
                    borderRadius: '2px',
                  }}>친구와 함께</li>
                  <li style={{
                    display: 'inline',
                    marginRight: 5,
                    padding: '2px 3px',
                    background: '#058294',
                    color: '#eee',
                    fontSize: '11px',
                    borderRadius: '2px',
                  }}>너희집</li>
                  <li style={{
                    display: 'inline',
                    marginRight: 5,
                    padding: '2px 3px',
                    background: '#058294',
                    color: '#eee',
                    fontSize: '11px',
                    borderRadius: '2px',
                  }}>친구</li>
                  <li style={{
                    display: 'inline',
                    marginRight: 5,
                    padding: '2px 3px',
                    background: '#058294',
                    color: '#eee',
                    fontSize: '11px',
                    borderRadius: '2px',
                  }}>친구헿</li>
                </ul>
                  <span><i className="fa fa-ellipsis-h"></i></span>
                </div>
            </li>
          </ul>
        </MainCard>

      </div>
    );
  }
}

Main.propTypes = {};
Main.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
  };
};

export default connect(
  mapStateToProps,
  {

  }
)(Main);