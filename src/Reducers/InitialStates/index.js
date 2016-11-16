import { Map, List } from 'immutable';

export const App = {

};

export const Domains = {
  Users: Map({}),
  Posts: Map({}),
  Comments: Map({}),
  Collections: Map({}),
  Forums: Map({}),
  Categories: Map({}),
  Prefixes: Map({}),
  SubComments: Map({}),
  Notis: Map({}),
};

export const UI = {
  Activity: Map({}),
  Auth: Map({ isLogin: false, userId: null }),
  Community: Map({}),
  ForumSetting: Map({
    forumInfo: {
      success: null
    }
  }),
  Gnb: Map({
    openGnb: false
  }),
  List: Map({
    scrollHeight: 0,
    CategoryList: List([])
  }),
  Login: Map({}),
  Modal: Map({
    contentType: null,
    openModal: false,
    location: null
  }),
  Pagination: Map({}),
  Report: Map({
    reportItem: [
      {
        id: 1,
        message: '불쾌하거나 흥미없는 내용입니다.'
      },
      {
        id: 2,
        message: '스팸성 글입니다.'
      },
      {
        id: 3,
        message: '인신공격, 불법, 허위 내용을 유포하고 있습니다.'
      }
    ],
    selectItem: 1,
    openReportModal: false,
    successReport: false
  }),
  ResetPassword: Map({
    error: null,
    requestFindEmail: null,
    userExist: null,
    resetEmailSent: null,
    isLoading: false
  }),
  Search: Map({
    query: null
  }),
  Setting: Map({}),
  Shopping: Map({
    items: List([]),
    storeModalOpen: false,
    tooltipItemCode: null,
    purchaseItem: null,
    openPurchaseWindow: false
  }),
  SigninForm: Map({

    // agree ui
    agreeTerm: false,
    agreePrivacy: false,
    confirmAgree: false,

    // form ui
    emailDup: null,
    nickDup: null,
    emailRequested: false,
    submitResult: false,
    emailVerifySuccess: false,
    emailVerifyFail: false,
    emailVerifyFormOpen: false,

    // form Value
    email: null,
    password: null,
    nick: null,
    sex: null,
    year: null,
    month: null,
    day: null,
    birth: null
  }),
  Submit: Map({
    deletedUrl: List(),
    representingImage: null
  }),
  SubmitForum: Map({
    form: {
      inputValue: {
        title: null,
        subHeader: null,
        description: null,
        rule: null,
      },
      didValidate: {
        title: false,
      },
      validate: {
        title: null
      },
      error: null
    },
  })
};