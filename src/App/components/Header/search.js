import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = props => {
  function setQuery(e) {
    props.FireInputSearchQuery(e.target.value);
  }

  function submitQuery(e) {
    e.preventDefault();

    const { SearchStore } = props;
    if (SearchStore) {
      const query = SearchStore.get('query');

      props.history.push({
        pathname: '/search',
        search: `?query=${query}`,
      });
    }
  }

  function getQueryValue() {
    const { SearchStore } = props;
    let query = '';

    if (SearchStore) {
      query = SearchStore.get('query') || '';
    }
    return query;
  }

  return (
    <form onSubmit={submitQuery}>
      <div className="ui input fluid small">
        <input type="text" placeholder="여기에 검색.."
               value={getQueryValue()}
               onChange={setQuery}
        />

        <div className="results"/>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  history: PropTypes.object.isRequired,
  SearchStore: PropTypes.object.isRequired,
  FireInputSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
