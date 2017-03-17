import React, {
  Component,
  PropTypes,
} from 'react';
import cx from 'classnames';
import style from './index.css';

const clubData = [
  { imgSrc: 'http://placehold.it/40x40', title: '나는열네지금부터열다섯자입다', subTitle: '너희에게 먼저 말해야겠어'},
  { imgSrc: 'http://placehold.it/40x40', title: '우리집 안녕', subTitle: '너희에게 먼저 말해야겠어'},
  { imgSrc: 'http://placehold.it/40x40', title: '우리집 안녕', subTitle: '너희에게 먼저 말해야겠어'},
  { imgSrc: 'http://placehold.it/40x40', title: '우리집 안녕', subTitle: '너희에게 먼저 말해야겠어'},
  { imgSrc: 'http://placehold.it/40x40', title: '우리집 안녕', subTitle: '너희에게 먼저 말해야겠어'},
  { imgSrc: 'http://placehold.it/40x40', title: '우리집 안녕', subTitle: '너희에게 먼저 말해야겠어'},
  { imgSrc: 'http://placehold.it/40x40', title: '우리집 안녕', subTitle: '너희에게 먼저 말해야겠어'},
];

class FollowingList extends Component {
  render() {
    return (
      <div className={cx([style.followingList, style.widgetBox])} >
        <div style={{fontWeight: 'bold', paddingBottom: 5}}>팔로잉 리스트</div>

        <div style={{paddingBottom: 5}}>
          클럽
          <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
            {clubData.map((v, i) => {
              return (
                <li key={i} style={{padding: '5px 0'}}>
                  <div style={{display: 'inline-block', float: 'left', paddingRight: 5}}>
                    <img src={v.imgSrc} />
                  </div>
                  <div>
                    <h4 style={{marginBottom: 4, fontSize: '1em'}}>{v.title}</h4>
                    <p>{v.subTitle}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div style={{paddingBottom: 5}}>
          태그
          <div>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
            <span style={{paddingRight: 5}}>#우리집</span>
          </div>
        </div>

        <div style={{paddingBottom: 5}}>
          유저
          <div>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user" style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user" style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user" style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user" style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user" style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
            <span style={{paddingRight: 5}}>
              <i className="fa fa-user" style={{color: '#aaa', paddingRight: 2}}/>우리집
            </span>
          </div>
        </div>
      </div>
    );
  }
}

FollowingList.propTypes = {};
FollowingList.defaultProps = {};

export default FollowingList;
