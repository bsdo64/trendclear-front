const { schema } = require('normalizr');


const prefix = new schema.Entity('prefixes');

const item = new schema.Entity('items');
const venatem = new schema.Entity('venatems', {
  item: item,
});
const inventory = new schema.Entity('inventories', {
  items: [venatem],
});

const author = new schema.Entity('author');


const subComment = new schema.Entity('subComments', {
  author: author,
});
const comment = new schema.Entity('comments', {
  author: author,
  subComments: [subComment],
});

const post = new schema.Entity('posts', {
  comments: [ comment ],
  author: author,
});

const forum = new schema.Entity('forums', {
  prefixes: [prefix],
  announces: [post],
  managers: [author],
  bans: [author],
});

const category = new schema.Entity('categories', {
  forums: [forum],
});
const categoryGroup = new schema.Entity('categoryGroups', {
  categories: [category],
});
const club = new schema.Entity('clubs', {
  category_groups: [categoryGroup],
});


const collection = new schema.Entity('collections', {
  forums: [forum],
});

const noti = new schema.Entity('notis');

author.define({
  collections: [collection],
  follow_forums: [forum],
  forumCreated: [forum],
  forumManaged: [forum],
  inventories: [inventory],
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
  inventory: inventory,
  venatem: venatem,
  item: item,
  comment: comment,
  subComment: subComment,

  noti: noti,
};
