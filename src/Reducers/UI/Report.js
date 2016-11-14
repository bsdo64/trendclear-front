import {Map} from 'immutable';

const initState = Map({
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
});

const Report = (state = initState, action) => {
  return state;
};

export default Report;
