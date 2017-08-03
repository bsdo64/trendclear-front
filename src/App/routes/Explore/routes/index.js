import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getExploreMainPost } from '../../../Selectors/Post';
import { getExploreMainCollections } from '../../../Selectors/Collection';
import { getExploreMainClubs } from '../../../Selectors/Club';
import style from './main.css';
import postStyle from './post.css';

const CollectionItem = props => {
  const { item } = props;
  const forums = item.get('forums');
  return (
    <div>
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
          {item.get('title')} <span style={{color: '#aaa', fontSize: 11}}>@{item.getIn(['creator', 'nick'])}</span>
        </span>
        <span className="td_t" style={{
          color: '#095e6b',
          paddingLeft: 10,
          flex: '1 0 auto',
          textAlign: 'right',
        }}>
          <span><i className="fa fa-files-o" aria-hidden="true"></i> {forums.size}</span>
        </span>
      </div>
      {/*<div style={{paddingTop: 10}}>
        무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁 무료로 챙기는 보건소 꿀팁
      </div>*/}
      <div className="td_ow" style={{ paddingTop: 5 }}>
        <ul className="td_o" style={{ display: 'inline', margin: 0, padding: 0, listStyle: 'none', }}>
          {
            forums.slice(0, 5).map((v, i) => {
              return (
                <li
                  key={i}
                  style={{
                    display: 'inline',
                    marginRight: 5,
                    padding: '3px 5px',
                    background: 'rgba(21, 130, 146, 0.75)',
                    fontSize: '11px',
                    borderRadius: '2px',
                  }}>
                  <Link to={`/club/${v.get('id')}`} style={{color: '#eee',}}>
                    <i className="fa fa-files-o" />
                    {` ${v.get('title')}`}
                  </Link>
                </li>
              )
            })
          }

        </ul>
        {
          forums.size > 5 &&
          <span><i className="fa fa-ellipsis-h"></i></span>
        }
      </div>
    </div>
  )
}

const ClubItem = props => {
  const { item } = props;

  return (
    <div style={{ alignItems: 'center', width: '100%' }}>
      <div className="tl_default" style={{ display: 'flex', alignItems: 'center' }}>
        {
          item.get('forum_image') &&
          <div style={{ display: 'flex', paddingRight: 10, }} className="td_a">
            <img
              src={`/image/uploaded/files/small/${item.get('forum_image')}`}
              width="30" height="30" alt="" className="td_m"/>
          </div>
        }
        <div className="td_t" style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: '#095e6b',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          <Link to={`/club/${item.get('id')}`} >{item.get('title')}</Link>
        </div>
        <div className="td_t" style={{
          color: '#095e6b',
          paddingLeft: 10,
          flex: '1 0 auto',
          textAlign: 'right'
        }}>
          <span style={{ paddingRight: 10 }}><i className='fa fa-star'/> {item.get('follow_count')}</span>
          <span><i className='fa fa-file-o'/> {item.get('post_count')}</span>
        </div>
      </div>
      <div className="td_ow" style={{ paddingTop: 5 }}>
        <span className="td_o">{item.get('sub_header')}</span>
      </div>
    </div>
  )
};

const PostItem = props => {
  const { item } = props;

  let postImg;
  if (item.get('has_img')) {
    postImg = <img src={`/image/uploaded/files/small/${item.get('has_img')}`} className={postStyle.td_m}/>;
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
    case 'club':
      Item = ClubItem;
      break;
    case 'collection':
      Item = CollectionItem;
      break;
    default:
      Item = PostItem;
      break;
  }

  return (
    <li className={listItemStyle}>
      <Item item={item} />
    </li>
  )
};

const MainCardList = (props) => {
  const { itemType, listType, items } = props;
  const listItemStyle = listType !== 'flex' ? style.ex_list_item : style.ex_list_item;
  return (
    <ul className={style.ex_list}>
      {items && items.map((v, i) => {
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
    const { mainPosts, mainClubs, mainCollections } = this.props;
    return (
      <div style={{ padding: 10 }}>
        <h3><i className="fa fa-globe"/> 탐색</h3>

        {/* 포스트 */}
        <MainCard type="posts" title="포스트">
          <MainCardList itemType="post" items={mainPosts} />
        </MainCard>

        {/* 클럽 */}
        <MainCard title="클럽" type="clubs">
          <MainCardList itemType="club" listType="flex" items={mainClubs} />
        </MainCard>

        {/* 컬렉션 */}
        <MainCard title="컬렉션" type="collections">
          <MainCardList itemType="collection" listType="flex" items={mainCollections} />
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
    mainPosts: getExploreMainPost(StoreState),
    mainClubs: getExploreMainClubs(StoreState),
    mainCollections: getExploreMainCollections(StoreState),
  }
};

export default connect(
  mapStateToProps,
  {

  }
)(Main);
