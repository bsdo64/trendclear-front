import React from 'react';
import SearchActions from '../../Actions/SearchActions';
import {browserHistory} from 'react-router';

require('./index.scss');
const SearchBar = React.createClass({

  setQuery(e) {
    "use strict";

    SearchActions.handleSearchQuery(e.target.value);
  },

  submitQuery(e) {
    "use strict";

    if (e.charCode === 13) {
      const {SearchStore} = this.props;
      const query = SearchStore.get('query');

      console.log('submit : ', query);

      console.log(this.props);

      browserHistory.push({pathname: '/search', query: {query: query}});
      // SearchActions.submitSearchQuery({query: query});
    }
  },

  render() {
    "use strict";

    const {SearchStore} = this.props;
    const query = SearchStore.get('query');

    return (
      <div className="ui input fluid small">
        <input type="text" placeholder="여기에 검색.."
               onChange={this.setQuery}
               value={query}
               onKeyPress={this.submitQuery}
        />
        <div className="results"></div>
      </div>
    )
  }
});

export default SearchBar;