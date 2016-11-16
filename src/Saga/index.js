import signin from './signin';
import login from './login';
import post from './post';
import followingList from './followingList';

export default function* rootSaga() {
  yield [
    signin(),
    login(),
    post(),
    followingList()
  ]
}
