import React, {
  Component,
} from 'react';
import cx from 'classnames';
import style from './index.css';
import fStyle from './famousStyle.css';

class FamousList extends Component {
  render() {
    return (
      <div className={cx([style.famousList, style.widgetBox])}>
        <div className={cx([fStyle.header])}>인기 포스트</div>
        <ul className={cx(fStyle.list)}>
          <li className={cx(fStyle.item)}>
            <div>
              <img src="http://placehold.it/240x100" />
            </div>
            <div>
              Hello world Hello worldHello worldHello world
            </div>
            <div className={cx(fStyle.meta)}>
              <span><i className="fa fa-heart" />123</span>
              <span><i className="fa fa-comment" />123</span>
            </div>
          </li>
          <li className={cx(fStyle.item)}>
            <div>
              <img src="http://placehold.it/240x100" />
            </div>
            <div>
              Hello world
            </div>
          </li>
          <li className={cx(fStyle.item)}>
            <div>
              <img src="http://placehold.it/240x100" />
            </div>
            <div>
              Hello world
            </div>
          </li>
          <li className={cx(fStyle.item)}>
            <div>
              <img src="http://placehold.it/240x100" />
            </div>
            <div>
              Hello world
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

FamousList.propTypes = {};
FamousList.defaultProps = {};

export default FamousList;
