import cx from 'classnames';

export const activeStyle = function(selector, match, url) {
  let isMatch;
  if (typeof match === 'string') {
    isMatch = url === match;
  }

  if (Array.isArray(match)) {
    isMatch = match.filter(v => v === url).length > 0;
  }

  return cx({ [selector]: isMatch });
};

export const getSeqPathName = function(pathname, seq = 0) {
  const array = pathname.split('/');

  if (array[seq]) {
    return '/' + array[seq];
  } else {
    return '/';
  }
};