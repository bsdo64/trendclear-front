import { UI } from '../InitialStates';

const ErrorPage = (state = UI.ErrorPage, action) => {
  switch (action.type) {

    case '': {

    }

    default:
      return state;
  }
};

export default ErrorPage;
