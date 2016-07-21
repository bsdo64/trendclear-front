import React from 'react';
import {browserHistory} from 'react-router';

import SearchActions from '../../Actions/SearchActions';

require('./index.scss');
const SearchBar = React.createClass({

  setQuery(e) {
    "use strict";

    SearchActions.handleSearchQuery(e.target.value);
  },

  submitQuery(e) {
    "use strict";

    e.preventDefault();

    const {SearchStore} = this.props;
    const query = SearchStore.get('query');

    browserHistory.push({pathname: '/search', query: {query: query}});
  },

  render() {
    "use strict";

    const {SearchStore} = this.props;
    const query = SearchStore.get('query');

    return (
      <form onSubmit={this.submitQuery}>
        <div className="ui input fluid small">
          <input type="text" placeholder="여기에 검색.."
                 value={query}
                 onChange={this.setQuery}
          />

          <div className="results"></div>
        </div>
      </form>
    )
  }
});

export default SearchBar;