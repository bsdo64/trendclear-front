import signin from './signin';
import login from './login';
import post from './post';
import report from './report';
import collection from './collection';
import followingList from './followingList';

export default function* rootSaga() {
  yield [
    signin(),
    login(),
    post(),
    report(),
    collection(),
    followingList()
  ]
}
