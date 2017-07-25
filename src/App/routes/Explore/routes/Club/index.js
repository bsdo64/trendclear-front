import React, {
  Component,
} from 'react';
import style from './index.css';

class Club extends Component {
  render() {
    return (
      <div className={style.explore_club}>
        <div className={style.card}>
          클럽 리스트
        </div>

        <ul className={style.clubCardList}>
          {Array(10).fill(0).map((v, i) => {
            return (
              <li key={i} className={style.clubCardItem}>
                <div className={style.cardImage}>
                  <img src="http://placehold.it/200x100" />
                </div>
                <div className={style.card}>
                  <div className={style.content}>
                    <div className={style.cardHeader}>
                      <div className={style.clubImage}>
                        <img src="http://placehold.it/40x40" />
                      </div>
                      <div>
                        <div className={style.clubTitle}>
                          안녕하십니까!
                        </div>
                        <div className={style.clubMeta}>
                          subHeader
                        </div>
                      </div>
                    </div>
                    <div className={style.cardContent}>
                      <div className={style.clubRule}>
                        Hello world!
                      </div>
                    </div>
                    <div className={style.cardStats}>
                      <div className={style.clubFollows + ' ' + style.button}>
                        <i className="fa fa-star" /> 140
                      </div>
                      <div className={style.clubSubs + ' ' + style.button}>
                        <i className="fa fa-star" /> 140
                      </div>
                      <div className={style.clubPosts + ' ' + style.button}>
                        <i className="fa fa-star" /> 140
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

Club.propTypes = {};
Club.defaultProps = {};

export default Club;
