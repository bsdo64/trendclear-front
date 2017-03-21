import React, {
  Component,
} from 'react';
import cx from 'classnames';
import style from './index.css';

class FamouseList extends Component {
  render() {
    return (
      <div className={cx([style.famousList, style.widgetBox])}>

      </div>
    );
  }
}

FamouseList.propTypes = {};
FamouseList.defaultProps = {};

export default FamouseList;
