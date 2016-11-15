import { Map } from 'immutable';

const initState = Map({
  error: null,
  requestFindEmail: null,
  userExist: null,
  resetEmailSent: null,
  isLoading: false
});

const ResetPassword = (state = initState, action) => {
  switch (action.type) {

    default:
      return state
  }
};

export default ResetPassword;
