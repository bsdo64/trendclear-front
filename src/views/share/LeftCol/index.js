import React, {
  PropTypes,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.css';

const LeftCol = React.createClass({
  render() {
    return (
      <div id="left_col">

        <div className={styles.gnbMenu}>
          <ul className={styles.appIconList}>
            <li className={styles.active}>
              <i className="fa fa-home" />
            </li>
            <li>
              <i className="fa fa-commenting" />
            </li>
          </ul>
          <ul className={styles.bottomIconList}>
            <li>
              <i className="fa fa-bars" />
            </li>
          </ul>
        </div>

        <div className={styles.gnbSubMenu}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>
              <p>베나클</p>
              <p>안녕하세요 베나클 입니다.</p>
              <p>많은 사람들은 생각합니다</p>
              <p>Cras metus felis, pretium eu nunc id, blandit finibus ipsum. Nam quis libero arcu. Ut tincidunt in eros porttitor blandit. Praesent commodo id nibh quis sollicitudin. Nunc condimentum congue ipsum vitae condimentum. Aenean tincidunt velit sed nunc efficitur, sed laoreet tellus lobortis. Curabitur vestibulum volutpat ultrices.</p>
              <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer vel massa sed augue euismod condimentum. Vestibulum bibendum elementum turpis, eu egestas nunc accumsan molestie. Mauris non aliquam dolor. Nullam eu congue purus, ut fermentum ante. Quisque ut nulla at nibh ornare pulvinar. Aenean in nisi eu est vulputate laoreet vel vitae turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla convallis purus tincidunt venenatis ullamcorper. Etiam tempor nulla nec nunc euismod, mattis ultrices mauris tempus. Morbi sodales ante vitae sollicitudin pretium. Pellentesque justo justo, gravida vel arcu ut, auctor placerat sem. Suspendisse potenti. Donec non eros scelerisque, accumsan orci non, condimentum massa. Sed sodales cursus velit eget dapibus. Nulla enim massa, consectetur id ex vitae, egestas commodo lacus.</p>
              <p>Aliquam lectus metus, luctus sit amet neque id, rutrum bibendum leo. Phasellus in sem id nulla sollicitudin euismod. Suspendisse accumsan congue magna, in consectetur magna fermentum vitae. Nullam at nibh dui. Sed nunc dui, aliquam vitae convallis et, sodales nec ex. Sed vitae faucibus quam. Mauris luctus efficitur enim in pretium. Sed non tempor risus, id fringilla nisl. Donec molestie consectetur tellus, eget eleifend magna tristique sit amet. Mauris mollis sollicitudin diam, in venenatis augue euismod nec. Maecenas diam nisi, laoreet vestibulum consectetur non, gravida vitae dui. Quisque tincidunt pretium molestie. Nullam efficitur felis at nisl imperdiet, quis feugiat justo venenatis. Duis aliquet semper dui in commodo. Suspendisse potenti. In nec ligula imperdiet, lacinia erat sed, vehicula dolor.</p>
            </div>
          </Scrollbars>
        </div>

      </div>
    );
  }
});

module.exports = LeftCol;
