import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../index.css';
import cx from 'classnames';

import { getWidgetBox } from '../../../../Selectors/WidgetBox';

const PolicyMenuBox = (props) => {
  const {widgetBox} = props;
  const toggleStyle = cx(styles.box, {
    [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
  });

  return (
    <div className={styles.gnbSubMenu}>
      <div className={toggleStyle}>
        <div className={styles.subMenuBox}>
          <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
            <Link to="/about">
              <span style={{color: '#fff', fontWeight: 'bold'}}>회사소개</span>
            </Link>
          </div>
          <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
            <Link to="/help">
              <span style={{color: '#fff', fontWeight: 'bold'}}>고객센터</span>
            </Link>
          </div>
          <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
            <span style={{color: '#fff', fontWeight: 'bold'}}>정책</span>
          </div>
          <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
            <Link to="/policies/privacy">
              <span>개인정보보호</span>
            </Link>
          </div>
          <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
            <Link to="/policies/terms">
              <span>서비스 약관</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

PolicyMenuBox.propTypes = {
  widgetBox: PropTypes.object.isRequired,
};
PolicyMenuBox.defaultProps = {

};

const mapStateToProps = (state, props) => {
  const stateStore = state.get('Stores');

  return {
    widgetBox: getWidgetBox(stateStore),
  };
};

export default connect(
  mapStateToProps,
  {},
)(PolicyMenuBox);
