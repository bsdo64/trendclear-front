import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import marked from '../../../Lib/Marked';

class SelectSearchForum extends React.Component {
  constructor(props) {
    super(props);

    this.selectForum = this.selectForum.bind(this);
  }

  componentDidMount() {
    $('.ui.search_forums')
      .search({
        searchFullText: false,
        apiSettings: {
          url: '/ajax/search/forum?q={query}',
        },
        error: {
          source: '검색 할 수 없습니다 API를 참고하세요',
          noResults: '일치하는 제목의 게시판이 없습니다',
          logging: 'Error in debug logging, exiting.',
          noEndpoint: 'No search endpoint was specified',
          noTemplate: 'A valid template name was not specified.',
          serverError: '서버에러 입니다.',
          maxResults: 'Results must be an array to use maxResults setting',
          method: 'The method you called is not defined.',
        },
        onSelect: (forum) => {

          this.selectForum(forum);
        },
      });
  }

  selectForum(forum) {
    if (forum && forum.id) {
      this.props.history.push('/submit/post?forumId=' + forum.id);
    }
  }

  render() {
    const {ForumCreated, ForumFollowed, RankForums} = this.props;

    return (
      <div id="submit_box">
        <div className="box">
          <div className={'post_item'}>

            {/* meta */}
            <div className="search_forum_box">
              <div className="search_box">
                <h3 className="ui header">
                  게시판 선택
                  <div className="sub header">관심 게시판을 찾아보세요</div>
                </h3>

                <div className="ui search search_forums">
                  <div className="ui icon input">
                    <input className="prompt" type="text" placeholder="게시판 찾아보기"/>
                    <i className="search icon"/>
                  </div>
                  <div className="results"/>
                </div>

                <div className="forum_lists">
                  <div className="created_forums_box">
                    <div className="header">내 게시판</div>
                    <ul className="list">
                      {
                        ForumCreated.sortBy(v => v.get('title')).map(v => {
                          return (
                            <li key={v.get('id')} className="item">
                              <Link
                                to={`?forumId=${v.get('id')}`}>
                                <span>{v.get('title')}</span>
                              </Link>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>

                  <div className="following_forums_box">
                    <div className="header">팔로잉 게시판</div>
                    <ul className="list">
                      {
                        ForumFollowed.sortBy(v => v.get('title')).map(v => {
                          return (
                            <li key={v.get('id')} className="item">
                              <Link
                                to={`?forumId=${v.get('id')}`}>
                                <span>{v.get('title')}</span>
                              </Link>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>

                  <div className="ranking_forums_box">
                    <div className="header">추천 게시판</div>
                    <ul className="list">
                      {
                        RankForums.map((v, i) => {
                          if (i === 0) {
                            return (
                              <li key={v.get('id')} className="item">
                                <div id="forum_info" style={{
                                  margin: '5px 0',
                                  padding: 0,
                                  border: '1px solid #ddd',
                                  minWidth: 300,
                                }}>
                                  <div className="ui cards">
                                    <div className="card" style={{
                                      borderTop: '1px solid rgb(5, 130, 148)',
                                      boxShadow: 'none',
                                      width: '100%',
                                    }}>
                                      <div className="content">
                                        <div className="header">
                                          <Link to={`/club/${v.get('id')}`}>
                                            {v.get('title')}
                                          </Link>
                                        </div>
                                        <div className="meta">
                                          {v.get('sub_header')}
                                        </div>
                                        <div className="description">
                                          {v.get('description')}
                                        </div>
                                        <div className="meta forum_meta">
                                          <div className="forum_counts">
                                          <span
                                            className="follow_counts">팔로우 {v.get(
                                            'follow_count')} 명</span>
                                            <span
                                              className="subs_counts">컬렉션 구독 {v.get(
                                              'subs_count')}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="content">
                                        {
                                          v.get('rule') &&
                                          <div >
                                            <div className="ui header tiny">
                                              클럽 규칙
                                            </div>
                                            <div className="description"
                                                 dangerouslySetInnerHTML={{
                                                   __html: marked(v.get('rule')),
                                                 }}
                                            />
                                          </div>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          } else {
                            return (
                              <li key={v.get('id')} className="item">
                                <Link
                                  to={`/submit/post?forumId=${v.get('id')}`}>
                                  <span>{v.get('title')}</span>
                                </Link>
                              </li>
                            );
                          }
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

SelectSearchForum.propTypes = {
  history: PropTypes.object.isRequired,
  ForumFollowed: PropTypes.object.isRequired,
  ForumCreated: PropTypes.object.isRequired,
  RankForums: PropTypes.object.isRequired,
};

export default SelectSearchForum;
