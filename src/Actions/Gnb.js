// Action Types
export const TOGGLE_GNB_PANEL = 'TOGGLE_GNB_PANEL';
export const OPEN_SIDE_CATEGORY = 'OPEN_SIDE_CATEGORY';
export const OPEN_FORUM_META = 'OPEN_FORUM_META';

// Action Creator
export function toggleGnbPanel() {
  return {
    type: TOGGLE_GNB_PANEL
  }
}

export function openSideCategory(clubId) {
  return {
    type: OPEN_SIDE_CATEGORY,
    clubId
  }
}

export function openForumMeta(forumId) {
  return {
    type: OPEN_FORUM_META,
    forumId
  }
}

export default {
  toggleGnbPanel,
  openSideCategory,
  openForumMeta,
}