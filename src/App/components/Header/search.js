import React, { PropTypes } from 'react';

const SearchBar = React.createClass({
  propTypes: {
    history: PropTypes.object.isRequired,
    SearchStore: PropTypes.object.isRequired,
    FireInputSearchQuery: PropTypes.func.isRequired,
  },

  setQuery(e) {
    this.props.FireInputSearchQuery(e.target.value);
  },

  submitQuery(e) {
    e.preventDefault();

    const { SearchStore } = this.props;
    if (SearchStore) {
      const query = SearchStore.get('query');

      this.props.history.push({
        pathname: '/search',
        search: `?query=${query}`,
      });
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

          <div className="results"/>
        </div>
      </form>
    );
  },
});

export default SearchBar;
