import { createSelector } from 'reselect';
import { shuffle } from 'lodash';
import { Map, List } from 'immutable';

const getForums = state => state.getIn(['Domains', 'Forums']);

export const rankForums = createSelector(
  [ getForums ],
  (forums) => {
    const forumList = forums.toList();

    return forumList.sort((a, b) => {
      const rankScoreA = a.get('follow_count') + a.get('subs_count') + a.get('post_count');
      const rankScoreB = b.get('follow_count') + b.get('subs_count') + b.get('post_count');

      if (rankScoreA > rankScoreB) { return -1; }
      if (rankScoreA < rankScoreB) { return 1; }
      if (rankScoreA === rankScoreB) { return 0; }
    }).slice(0, 9).toSet().toList()
  }
);
