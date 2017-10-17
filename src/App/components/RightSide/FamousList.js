import React, {
  Component,
} from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFamousPostList } from '../../Selectors/Post';
import style from './index.css';
import fStyle from './famousStyle.css';

const FamouseListItem = () => {
  return (
    <li className={cx(fStyle.item)}>
      <div>
        <img src="http://placehold.it/240x100" />
      </div>
      <div>
        <div className={fStyle.title}>
          Hello world Hello worldHello worldHello world
        </div>
        <div className={cx(fStyle.subTitle)}>
          <div className={fStyle.club}>
            우리집
          </div>
          <div className={fStyle.meta}>
            <span><i className="fa fa-heart" />123</span>
            <span><i className="fa fa-comment" />123</span>
          </div>
        </div>
      </div>
    </li>
  )
};

class FamousList extends Component {
  render() {
    const { list } = this.props;

    if (list && list.size > 0) {
      return (
        <div className={cx([style.famousList, style.widgetBox])}>
          <div className={cx([fStyle.header])}>인기 포스트</div>
          <ul className={cx(fStyle.list)}>
            {
              list.map((v, i) => {
                return (
                  <li key={i} className={cx(fStyle.item)}>
                    <Link to={`/club/${v.getIn(['forum', 'id'])}?postId=${v.get('id')}`}
                          className={fStyle.anchor}>
                      <div className={fStyle.imageBox}>
                        {
                          v.get('has_img') &&
                          <img src={`/image/uploaded/files/medium/${v.get('has_img')}`} />
                        }

                        {
                          !v.get('has_img') &&
                          <img src={`/images/cat1.jpeg`} />
                        }
                      </div>
                      <div>
                        <div className={fStyle.title}>
                          {v.get('title')}
                        </div>
                        <div className={cx(fStyle.subTitle)}>
                          <div className={fStyle.club}>
                            {v.getIn(['forum', 'title'])}
                          </div>
                          <div className={fStyle.meta}>
                          <span className={fStyle.like}>
                            <i className="fa fa-heart" />{v.get('like_count')}
                          </span>
                            <span className={fStyle.comment}>
                            <i className="fa fa-comment" />{v.get('comment_count')}
                          </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

FamousList.propTypes = {};
FamousList.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    list: getFamousPostList(StoreState)
  };
};

export default connect(
  mapStateToProps,
  {}
)(FamousList);
