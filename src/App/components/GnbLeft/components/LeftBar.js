import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../../Selectors/User';
import { toggleLoginModal } from '../../../Actions/Login';

import { createLazyMod } from '../../../Lib/utils';
const SkillBox = createLazyMod(require('bundle-loader?lazy&name=[name]!../components/SkillBox/index.js'));

import styles from '../index.css';
import { getSeqPathName, activeStyle } from '../func.js';


class LeftBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleLogin = this.handleToggleLogin.bind(this);
  }

  handleToggleLogin() {
    const { location, FireToggleLoginModal } = this.props;
    FireToggleLoginModal({
      contentType: 'Login',
      location: location.pathname + location.search,
    });
  }

  render() {
    const { location, user } = this.props;
    const pathname = getSeqPathName(location.pathname, 1);
    const getStyle = (path) => activeStyle(styles.active, path, pathname);

    return (
      <div className={styles.gnbMenu}>
        <ul className={styles.appIconList}>
          <li className={getStyle(['/', '/collection'])}>
            <Link to="/"><i className="fa fa-home"/></Link>
          </li>
          <li className={getStyle('/explore')}>
            <Link to="/explore"><i className="fa fa-globe"/></Link>
          </li>
          <li className={getStyle('/submit')}>
            <Link to="/submit"><i className="fa fa-pencil"/></Link>
          </li>
          <li className={getStyle('/user')}>
            {
              user &&
              <Link to="/user"><i className="fa fa-user"/></Link>
            }

            {
              !user &&
              <a style={{cursor: 'pointer'}} onClick={this.handleToggleLogin}><i className="fa fa-user"/></a>
            }
          </li>
        </ul>
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(34,36,38,.15)',
          borderBottom: '1px solid rgba(255,255,255,.1)',
        }}>
        </div>
        {
          user &&
          <SkillBox user={user} />
        }
        <ul className={styles.bottomIconList}>
          <li>
            <i className="fa fa-bars"/>
          </li>
        </ul>
      </div>
    );
  }
}

LeftBar.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object,
  FireToggleLoginModal: PropTypes.func.isRequired
};
LeftBar.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
    user: getUser(StoreState)
  };
};

const LeftBarContainer = connect(
  mapStateToProps,
  {
    FireToggleLoginModal: toggleLoginModal,
  },
)(LeftBar);

export default LeftBarContainer;
