import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { getSeqPathName, activeStyle } from '../../func';
import styles from '../../index.css';
import { connect } from "react-redux";
import { getWidgetBox } from '../../../../Selectors/WidgetBox';
import WidgetContainer from '../../../../components/WidgetBox/index.js';

class SubmitMenuBox extends React.Component {
  render() {
    const { match, location, widgetBox } = this.props;
    const pathname = getSeqPathName(location.pathname, 2);
    const getStyle = (path) => activeStyle(styles.activeButton, path, pathname);
    const toggleStyle = cx(styles.box, {
      [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
    });

    return (
      <div className={styles.gnbSubMenu}>
        <div className={toggleStyle}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>
              <div className={cx([styles.subMenuItem, getStyle('/')])}>
                <Link to={`${match.url}`}>
                  <i className="fa fa-star"/>
                  <span>메인</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/post')])}>
                <Link to={`${match.url}/post`}>
                  <i className="fa fa-file"/>
                  <span>포스트</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/club')])}>
                <Link to={`${match.url}/club`}>
                  <i className="fa fa-files-o"/>
                  <span>클럽</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/series')])}>
                <Link to={`${match.url}/series`}>
                  <i className="fa fa-list"/>
                  <span>시리즈</span>
                </Link>
              </div>

            </div>

          </Scrollbars>
        </div>

        <Route component={WidgetContainer} />
      </div>
    );
  }
}

SubmitMenuBox.propTypes = {
  widgetBox: PropTypes.object,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
SubmitMenuBox.defaultProps = {};

const mapStateToProps = (state) => {
  const stateStore = state.get('Stores');

  return {
    widgetBox: getWidgetBox(stateStore)
  };
};

export default connect(
  mapStateToProps,
  {},
)(SubmitMenuBox);
