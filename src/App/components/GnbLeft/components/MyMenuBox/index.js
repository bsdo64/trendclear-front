import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import styles from '../../index.css';
import cx from 'classnames';
import { getUser } from '../../../../Selectors/User.js';
import { getWidgetBox } from '../../../../Selectors/WidgetBox';
import WidgetContaienr from '../../../../components/WidgetBox/index.js';

class MyMenuBox extends React.Component {
  constructor() {
    super();

    this.state = {
      openSearch: false,
    };
  }

  render() {
    const { user, widgetBox } = this.props;
    const toggleStyle = cx(styles.box, {
      [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
    });

    return (
      <div className={styles.gnbSubMenu}>
        <div className={toggleStyle}>
          {
            user &&
            <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
              <div className={styles.subMenuBox}>
                <div className={styles.subMenuItem}>
                  <Link to={`/user`}>
                    <i className="fa fa-user"/>
                    <span>{user.get('nick')}</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/setting/password">
                    <span>비밀번호 변경</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/setting/profile">
                    <span>정보 변경</span>
                  </Link>
                </div>
              </div>

            </Scrollbars>
          }
        </div>

        <Route component={WidgetContaienr} />
      </div>
    );
  }
}

MyMenuBox.propTypes = {
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  widgetBox: PropTypes.object.isRequired,
};
MyMenuBox.defaultProps = {
  user: Map(),
};

const mapStateToProps = (state, props) => {
  const stateStore = state.get('Stores');

  return {
    user: getUser(stateStore),
    widgetBox: getWidgetBox(stateStore)
  };
};

export default connect(
  mapStateToProps,
  {

  },
)(MyMenuBox);
