import React, {
  PropTypes,
} from 'react';
import styles from '../index.css';

const Main = ({ match, history }) => {

  const goto = (url) => () => history.push(url);

  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span><i className="fa fa-pencil" /></span>
          글쓰기
        </div>

        <div className={styles.submitType}>
          <ul>
            <li>
              <div className={styles.submitBox}
                   onClick={goto(`${match.url}/post`)}
              >
                <div className={styles.iconBox}><i className="fa fa-file" /></div>
                <div className={styles.submitContent}>
                  <div className={styles.submitContentHeader}>포스트 만들기</div>
                  <div className={styles.submitContentDescription}>
                    베나클 커뮤니티에 컨텐츠를 공유하세요! 누구나 공개된 클럽에 글을 올릴 수 있습니다.
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.submitBox}
                   onClick={goto(`${match.url}/club`)}
              >
                <div className={styles.iconBox}><i className="fa fa-files-o" /></div>
                <div className={styles.submitContent}>
                  <div className={styles.submitContentHeader}>클럽 만들기</div>
                  <div className={styles.submitContentDescription}>
                    베나클에 자신이 원하는 주제의 커뮤니티를 만들 수 있습니다.
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.submitBox}
                   onClick={goto(`${match.url}/series`)}
              >
                <div className={styles.iconBox}><i className="fa fa-list" /></div>
                <div className={styles.submitContent}>
                  <div className={styles.submitContentHeader}>시리즈 만들기</div>
                  <div className={styles.submitContentDescription}>
                    베나클 커뮤니티에 컨텐츠를 공유하세요! 누구나 공개된 클럽에 글을 올릴 수 있습니다.
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

Main.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
Main.defaultProps = {};

export default Main;
