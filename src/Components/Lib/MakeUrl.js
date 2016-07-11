import qs from 'qs';

class MakeUrl {
  constructor(location) {
    this.pathname = location.pathname + '?';
    this.query = {
      categoryId:   location.query.categoryId,
      forumId:      location.query.forumId,
      postId:       location.query.postId,
      p:            location.query.p || 1,
      comment_p:    location.query.comment_p || 1,
      forumPrefix:  location.query.forumPrefix,
      forumSearch:  location.query.forumSearch
    }
  }
  
  // Community Post
  setQuery(typeName, typeValue) {
    this.query[typeName] = typeValue;
    return this.pathname + qs.stringify(this.query, {skipNulls: true});
  }
  
  removeQuery(typeName) {
    this.query[typeName] = null;
    return this.pathname + qs.stringify(this.query, {skipNulls: true});
  }
}


export default MakeUrl;