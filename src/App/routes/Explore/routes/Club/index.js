import React, {
  Component,
} from 'react';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StackGrid from 'react-stack-grid';
import style from './index.css';
import { requestGetMoreList } from '../../../../Actions/List';
import { getExploreClubs } from '../../../../Selectors/Club';
import { getCollection } from '../../../../Selectors/Pagination';

class Club extends Component {
  getMoreBest = (data) => {
    const { FireRequestGetMoreList, pagination } = this.props;

    if (pagination.get('next_page')) {
      FireRequestGetMoreList({
        listName: 'exploreClubs',
        pathName: '/list',
        params: {
          page: pagination.get('next_page'),
        },
      });
    }
  };

  render() {

    const { clubs } = this.props;

    return (
      <div className={style.explore_club}>
        <div className={style.card}>
          클럽 리스트
        </div>

        <ul className={style.clubCardList}>
          <StackGrid
            columnWidth={290}
            gutterWidth={10}
          >
          {clubs && clubs.map((v, i) => {
            return (
              <li key={i} className={style.clubCardItem}>
                {/*<div className={style.cardImage}>
                  <img src="http://placehold.it/200x100" />
                </div>*/}
                <div className={style.card + ' ' + style.clubCard}>
                  <div className={style.content}>
                    <div className={style.cardHeader}>
                      <div className={style.clubImage}>
                        <img src={`/image/uploaded/files/${v.get('forum_image')}`} />
                      </div>
                      <div className={style.clubInfo}>
                        <div className={style.clubTitle}>
                          <Link to={`/club/${v.get('id')}`}>{v.get('title')}</Link>
                        </div>
                        <div className={style.clubMeta}>
                          {v.get('sub_header')}
                        </div>
                      </div>
                    </div>
                    <div className={style.cardContent}>
                      <div className={style.clubRule}>
                        <pre>
                          {v.get('rule')}
                        </pre>
                      </div>
                    </div>
                    <div className={style.cardStats}>
                      <div className={style.clubFollows + ' ' + style.button}>
                        <i className="fa fa-star" /> {v.get('follow_count')}
                      </div>
                      <div className={style.clubSubs + ' ' + style.button}>
                        <i className="fa fa-star" /> 구독하기
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
          </StackGrid>
        </ul>

        <Waypoint
          onEnter={this.getMoreBest}
          bottomOffset='-200px'
          scrollableAncestor={window || null}
        />

      </div>
    );
  }
}

Club.propTypes = {};
Club.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
    clubs: getExploreClubs(StoreState),
    pagination: getCollection('exploreClubs')(StoreState)
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestGetMoreList: requestGetMoreList
  },
)(Club);