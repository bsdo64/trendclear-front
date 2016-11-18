import { combineReducers } from 'redux-immutable';
import Activity from './Activity';
import Auth from './Auth';
import Community from './Community';
import ForumSetting from './ForumSetting';
import Gnb from './Gnb';
import List from './List';
import Login from './Login';
import Modal from './Modal';
import Pagination from './Pagination';
import Report from './Report';
import ResetPassword from './ResetPassword';
import RemoveModal from './RemoveModal';
import Search from './Search';
import Setting from './Setting';
import Shopping from './Shopping';
import SigninForm from './SigninForm';
import Submit from './Submit';
import SubmitForum from './SubmitForum';

// UI reducer
export default combineReducers({
  Activity,
  Auth,
  Community,
  ForumSetting,
  Gnb,
  List,
  Login,
  Modal,
  Pagination,
  Report,
  ResetPassword,
  RemoveModal,
  Search,
  Setting,
  Shopping,
  SigninForm,
  Submit,
  SubmitForum,
});
