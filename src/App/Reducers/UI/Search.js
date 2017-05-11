import { UI } from '../InitialStates';
import {
  INPUT_SEARCH_QUERY,
  REQUEST_SEARCH_QUERY_RANK,
  SUCCESS_SEARCH_QUERY_RANK,
} from '../../Actions/Search';

const Search = (state = UI.Search, action) => {
  switch (action.type) {
    case INPUT_SEARCH_QUERY: {
      return state.merge({query: action.query});
    }

    case REQUEST_SEARCH_QUERY_RANK: {
      return state.merge({requestRank: true})
    }

    case SUCCESS_SEARCH_QUERY_RANK: {
      return state.merge({
        requestRank: false,
        queryRankList: action.payload
      })
    }

    default:
      return state;
  }
};

export default Search;
