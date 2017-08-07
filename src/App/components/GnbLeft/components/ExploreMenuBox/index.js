import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { connect } from "react-redux";
import { getWidgetBox } from '../../../../Selectors/WidgetBox';
import { getSeqPathName, activeStyle } from '../../func';
import styles from '../../index.css';
import WidgetContainer from '../../../WidgetBox/index.js';

class ExploreMenuBox extends React.Component {
  render() {
    const { match, location, widgetBox } = this.props;
    const toggleStyle = cx(styles.box, {
      [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
    });
    const pathname = getSeqPathName(location.pathname, 2);
    const getStyle = (path) => activeStyle(styles.activeButton, path, pathname);

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

              <div className={cx([styles.subMenuItem, getStyle('/posts')])}>
                <Link to={`${match.url}/posts`}>
                  <i className="fa fa-file"/>
                  <span>포스트</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/clubs')])}>
                <Link to={`${match.url}/clubs`}>
                  <i className="fa fa-files-o"/>
                  <span>클럽</span>
                </Link>
              </div>

              {/*<div className={cx([styles.subMenuItem, getStyle('/collections')])}>*/}
                {/*<Link to={`${match.url}/collections`}>*/}
                  {/*<i className="fa fa-folder"/>*/}
                  {/*<span>컬랙션</span>*/}
                {/*</Link>*/}
              {/*</div>*/}

              {/*<div className={cx([styles.subMenuItem, getStyle('/tags')])}>*/}
                {/*<Link to={`${match.url}/tags`}>*/}
                  {/*<i className="fa fa-hashtag"/>*/}
                  {/*<span>태그</span>*/}
                {/*</Link>*/}
              {/*</div>*/}

              {/*<div className={cx([styles.subMenuItem, getStyle('/series')])}>*/}
                {/*<Link to={`${match.url}/series`}>*/}
                  {/*<i className="fa fa-list"/>*/}
                  {/*<span>시리즈</span>*/}
                {/*</Link>*/}
              {/*</div>*/}

              {/*<div className={cx([styles.subMenuItem, getStyle('/users')])}>*/}
                {/*<Link to={`${match.url}/users`}>*/}
                  {/*<i className="fa fa-user"/>*/}
                  {/*<span>유저</span>*/}
                {/*</Link>*/}
              {/*</div>*/}

            </div>

          </Scrollbars>
        </div>

        <Route component={WidgetContainer}/>
      </div>
    );
  }
}

ExploreMenuBox.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  widgetBox: PropTypes.object.isRequired,
};
ExploreMenuBox.defaultProps = {};

const mapStateToProps = (state, props) => {
  const stateStore = state.get('Stores');

  return {
    widgetBox: getWidgetBox(stateStore)
  };
};

export default connect(
  mapStateToProps,
  {},
)(ExploreMenuBox);
