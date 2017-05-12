const { schema } = require('normalizr');

export const prefix = new schema.Entity('prefixes');

export const item = new schema.Entity('items');

export const venatem = new schema.Entity('venatems', {
  item: item,
});
export const inventory = new schema.Entity('inventories', {
  items: [venatem],
});

export const author = new schema.Entity('author');

export const subComment = new schema.Entity('subComments', {
  author: author,
});
export const comment = new schema.Entity('comments', {
  author: author,
  subComments: [subComment],
});

export const post = new schema.Entity('posts', {
  comments: [ comment ],
  author: author,
});

export const forum = new schema.Entity('forums', {
  prefixes: [prefix],
  announces: [post],
  managers: [author],
  bans: [author],
});

export const category = new schema.Entity('categories', {
  forums: [forum],
});
export const categoryGroup = new schema.Entity('categoryGroups', {
  categories: [category],
});
export const club = new schema.Entity('clubs', {
  category_groups: [categoryGroup],
});


export const collection = new schema.Entity('collections', {
  forums: [forum],
});

export const noti = new schema.Entity('notis');

author.define({
  collections: [collection],
  follow_forums: [forum],
  forumCreated: [forum],
  forumManaged: [forum],
  inventories: [inventory],
});
