import signin from './signin';

export default function* rootSaga() {
  yield [
    signin()
  ]
}
