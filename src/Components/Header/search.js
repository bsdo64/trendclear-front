import React from 'react';
import { browserHistory } from 'react-router';
import SearchActions from '../../Actions/SearchActions';

require('./index.scss');
const SearchBar = React.createClass({

  setQuery(e) {
    SearchActions.handleSearchQuery(e.target.value);
  },

  submitQuery(e) {
    e.preventDefault();

    const { SearchStore } = this.props;
    if (SearchStore) {
      const query = SearchStore.get('query');

      browserHistory.push({ pathname: '/search', query: { query: query } });
    }
  },

  getQueryValue() {
    const { SearchStore } = this.props;
    let query = '';

    if (SearchStore) {
      query = SearchStore.get('query') || '';
    }

    return query;
  },

  render() {
    return (
      <form onSubmit={this.submitQuery}>
        <div className="ui input fluid small">
          <input type="text" placeholder="여기에 검색.."
                 value={this.getQueryValue()}
                 onChange={this.setQuery}
          />

          <div className="results"></div>
        </div>
      </form>
    )
  }
});

export default SearchBar;