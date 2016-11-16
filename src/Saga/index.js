import signin from './signin';
import followingList from './followingList';

export default function* rootSaga() {
  yield [
    signin(),
    followingList()
  ]
}
