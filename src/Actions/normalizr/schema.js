const { Schema, arrayOf } = require('normalizr');

const club = new Schema('clubs');
const categoryGroup = new Schema('categoryGroups');
const category = new Schema('categories');
const forum = new Schema('forums');
const prefix = new Schema('prefixes');

const post = new Schema('posts');
const author = new Schema('author');
const comment = new Schema('comments');
const subComment = new Schema('subComments');

club.define({
  category_groups: arrayOf(categoryGroup)
});

categoryGroup.define({
  categories: arrayOf(category)
});

category.define({
  forums: arrayOf(forum)
});

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
  club: club,
  categoryGroup: categoryGroup,
  category: category,
  forum: forum,
  prefix: prefix,

  post: post,
  author: author,
  comment: comment,
  subComment: subComment
};