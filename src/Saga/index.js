import user from './user';
import signin from './signin';
import login from './login';
import post from './post';
import forum from './forum';
import deleteItem from './deleteItem';
import report from './report';
import collection from './collection';
import followingList from './followingList';

export default function* rootSaga() {
  yield [
    user(),
    signin(),
    login(),
    post(),
    forum(),
    deleteItem(),
    report(),
    collection(),
    followingList()
  ]
}
