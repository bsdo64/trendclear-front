import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class PostActions {
  handleTitle(title) {
    return title;
  }
  handleContent(content) {
    return content;
  }
  submitPost(post) {
    return (dispatch) => {
      Api
        .post('/community/submit', post)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(PostActions);
