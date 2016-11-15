import { combineReducers } from 'redux-immutable';
import Auth from './Auth';
import Community from './Community';
import Gnb from './Gnb';
import List from './List';
import Login from './Login';
import Modal from './Modal';
import Pagination from './Pagination';
import Report from './Report';
import Search from './Search';
import SigninForm from './SigninForm';

// UI reducer
export default combineReducers({
  Auth,
  Community,
  Gnb,
  List,
  Login,
  Modal,
  Pagination,
  Report,
  Search,
  SigninForm,
});
