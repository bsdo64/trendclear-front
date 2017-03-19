import qs from 'qs';

class MakeUrl {
  constructor(location) {
    const query = qs.parse(location.search.slice(1));

    this.pathname = location.pathname + '?';
    this.query = {
      forumId: query.forumId,
      postId: query.postId,
      p: query.p || 1,
      comment_p: query.comment_p || 1,
      forumPrefix: query.forumPrefix,
      forumSearch: query.forumSearch,
      comment_order: query.comment_order,
      order: query.order,
    }
  }

  // Community Post
  setQuery(typeName, typeValue) {
    this.query[typeName] = typeValue;

    return this;
  }

  removeQuery(...args) {
    for (let index in args) {
      this.query[args[index]] = null;
    }

    return this;
  }

  end() {
    return this.pathname + qs.stringify(this.query, { skipNulls: true });
  }
}

export default MakeUrl;