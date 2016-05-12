const { Schema, arrayOf } = require('normalizr');

const forum = new Schema('forums');
const prefix = new Schema('prefixes');

const post = new Schema('posts');
const author = new Schema('author');
const comment = new Schema('comments');
const subComment = new Schema('subComments');

forum.define({
  prefixes: arrayOf(prefix)
});

comment.define({
  author: author,
  subComments: arrayOf(subComment)
});

post.define({
  comments: arrayOf(comment),
  author: author
});

module.exports = {
  forum: forum,
  prefix: prefix,

  post: post,
  author: author,
  comment: comment,
  subComment: subComment
};