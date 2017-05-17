import React from 'react';
import PropTypes from 'prop-types';
import BigPost from '../PostItem/BigPost';
import ReactTooltip from 'react-tooltip';
import './BestList.scss';

function createItem(props, id) {

  const {
    history, location,
    PostItems, AuthorItems, User, Venatems, Items
  } = props;

  const post = PostItems.get(id.toString());
  if (post) {
    const author = AuthorItems.get(post.get('author').toString());

    if (author) {
      const user = User.get('userId') ? AuthorItems.get(
        User.get('userId').toString()) : null;

      return [
        <BigPost
          key={id}
          author={author}
          post={post}
          user={user}
          view={false}
          shorten={true}
          location={location}
          history={history}
          Venatems={Venatems}
          Items={Items}
          FireSetScrollPosition={props.FireSetScrollPosition}
          FireToggleLoginModal={props.FireToggleLoginModal}
          FireToggleReportModal={props.FireToggleReportModal}
          FireToggleDeleteModal={props.FireToggleDeleteModal}
          FireRequestLikePost={props.FireRequestLikePost}
          FireToggleActiveVenalinkModal={props.FireToggleActiveVenalinkModal}
          FireRequestActivateVenalink={props.FireRequestActivateVenalink}
          FireRequestParticipateVenalink={props.FireRequestParticipateVenalink}
          FireOpenCommentUpdateView={props.FireOpenCommentUpdateView}
          FireSetFocusCurrentPost={props.FireSetFocusCurrentPost}
        />,
      ];
    }
  }
}

class InfiniteList extends React.Component {
  componentDidMount() {
    $('ui.embed').embed();
  }

  componentDidUpdate() {
    $('.ui.embed').embed('refresh');

    ReactTooltip.rebuild();
  }

  render() {
    const {PostIdList = [], PostItems = {}, AuthorItems, User} = this.props;
    const okey = !!(PostItems.size && AuthorItems.size && User.size);

    return (
      <div className="ui items best_list">
        {
          okey &&
          PostIdList.map(createItem.bind(null, this.props))
        }
      </div>
    );
  }
}

InfiniteList.displayName = 'InfiniteList';
InfiniteList.propTypes = {
  PostIdList: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  PostItems: PropTypes.object.isRequired,
  AuthorItems: PropTypes.object.isRequired,
  User: PropTypes.object.isRequired,
  Venatems: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
  scrollHeight: PropTypes.number.isRequired,
  FireSetScrollPosition: PropTypes.func.isRequired,
  FireToggleLoginModal: PropTypes.func.isRequired,
  FireToggleReportModal: PropTypes.func.isRequired,
  FireToggleDeleteModal: PropTypes.func.isRequired,
  FireRequestLikePost: PropTypes.func.isRequired,
  FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
  FireRequestActivateVenalink: PropTypes.func.isRequired,
  FireRequestParticipateVenalink: PropTypes.func.isRequired,
  FireSetFocusCurrentPost: PropTypes.func.isRequired,
};
InfiniteList.defaultProps = {
  scrollHeight: 0,
};

export default InfiniteList;
