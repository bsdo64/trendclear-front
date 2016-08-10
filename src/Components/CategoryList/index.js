import { Link, browserHistory } from 'react-router';

var React = require('react');

require('./index.scss');
const CategoryList = React.createClass({
  displayName: 'CategoryList',
  createCategoryItem(category) {
    return <CategoryItem key={category.get('id')} category={category} />;
  },
  render() {
    const { CommunityStore } = this.props;
    const forum = CommunityStore.get('forum');

    if (forum) {
      return (
        <div id="forum_category">
          {/* Title */}
          <div id="sub_category">
            <div className="sub_category_button">
              <div className="sub_category_text">{forum.get('title')}</div>
            </div>
          </div>

          {/* Menu */}
          <menu className="sub_category_list" key={forum.get('id')}>


            <ul >
              <li >
                <h5 className="">
                  <a>{'뉴스피드'}</a>
                </h5>

                <div className="sub_category item">
                  <Link to={{pathname: '/community'}}>{'최신 글'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: '/community'}}>{'인기 글'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: '/community'}}>{'많이 본 글'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: '/community'}}>{'댓글 많은 글'}</Link>
                </div>
              </li>
            </ul>
          </menu>
        </div>
      )
    } else {
      return (<div></div>)
    }

    // if (categories) {
    //   return List.isList(categories) ?
    //     <div>{categories.map(this.createCategoryItem)}</div> :
    //     <div>{this.createCategoryItem(categories)}</div>;
    // } else {
    //   return <div></div>;
    // }
  }
});

export default CategoryList;