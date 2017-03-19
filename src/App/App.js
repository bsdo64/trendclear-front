import React, { PropTypes } from 'react';
import { Provider, connect } from 'react-redux';

import Router from './Routes';

import { 
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

/* Routes */
import Gnb from '../Container/Gnb';
import HeaderMyMenu from '../Container/Header/MyMenu';
import HeaderSearch from '../Container/Header/Search';
import ModalContainer from '../Container/Modal/ModalContainer';
import ContentsContainer from '../Container/Contents/Best';
import RightSide from '../Container/RightSide/RightSide';
import WidgetContainer from '../Container/RightCol/WidgetContainer';

const Header = (props) => {
  return (
    <div id="global-header">
      <div className="top_area">
        <div className="top_contents">
          <div>
            <div id="top_logo" onClick={() => {
              document.body.scrollTop = 0;
            }}>
              <Link className="ui header inverted huge" to="/">
                <img src={require('../images/Venacle.png')} />
              </Link>
            </div>
            <div id="top_my_area">
              <Route path="*" component={HeaderMyMenu}/>
            </div>
            <div id="top_search">
              <Route path="*" component={HeaderSearch}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Contents = (props) => {
  return (
    <div id="container">
      
      <Route exact path="/" component={Gnb}/>

      {
        /*<div id="left_col">

            /!*<div id="category_menu">
              { props.LeftColGnb }
            </div>
            <div id="category">
              { props.LeftColMenu }
            </div>*!/
          </div>*/
      }

      <div id="section">
        <div id="contents">
          <Route component={ContentsContainer}/>
        </div>

        <Route component={RightSide}/>

        <div id="right_col">
          <Route component={WidgetContainer}/>
        </div>
      </div>
    </div>
  )
}

class DataInitializer extends React.Component {
  constructor() {
    super();

    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    this.props.initialize(this.props.location);
    this.setState({ initialized: true })
  }

  componentWillReceiveProps(nextProps) {
    // will be true
    if (this.state.initialized) {
      const locationChanged = nextProps.location !== this.props.location;

      if (locationChanged) {
        this.props.initialize(nextProps.location);
      }
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: (location) => {
      dispatch({ type: '@@router/LOCATION_CHANGE', payload: location })
    }
  }
}

const Listener = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataInitializer);


const Body = (props) => {
  return (
    <div>
      <div id="wrap">
        <Header {...props} />
        <Contents {...props} />
      </div>
      <div id="modal">
        <Route component={ModalContainer}/>
      </div>

      <Route component={Listener}/>

    </div>
  )
};

const App = (props) => {
  return (
    <Provider store={props.store}>
      {/*{Router(props.store)}*/}
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;