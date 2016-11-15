const { Schema, arrayOf } = require('normalizr');

const club = new Schema('clubs');
const categoryGroup = new Schema('categoryGroups');
const category = new Schema('categories');
const collection = new Schema('collections');
const forum = new Schema('forums');
const prefix = new Schema('prefixes');

const post = new Schema('posts');
const author = new Schema('author');
const comment = new Schema('comments');
const subComment = new Schema('subComments');

const noti = new Schema('notis');

author.define({
  collections: arrayOf(collection),
  follow_forums: arrayOf(forum),
  forumCreated: arrayOf(forum),
  forumManaged: arrayOf(forum)
});

club.define({
  category_groups: arrayOf(categoryGroup)
});

categoryGroup.define({
  categories: arrayOf(category)
});

category.define({
  forums: arrayOf(forum)
});

collection.define({
  forums: arrayOf(forum)
});

forum.define({
  prefixes: arrayOf(prefix),
  announces: arrayOf(post),
  managers: arrayOf(author),
  bans: arrayOf(author)
});

comment.define({
  author: author,
  subComments: arrayOf(subComment)
});

subComment.define({
  author: author
});

post.define({
  comments: arrayOf(comment),
  author: author
});

module.exports = {
  club: club,
  categoryGroup: categoryGroup,
  category: category,
  collection: collection,
  forum: forum,
  prefix: prefix,

  post: post,
  author: author,
  comment: comment,
  subComment: subComment,

  noti: noti
};