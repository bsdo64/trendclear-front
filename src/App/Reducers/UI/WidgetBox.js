import { UI } from '../InitialStates';
import { TOGGLE_TREND_BOX } from '../../Actions/WidgetBox';

const WidgetBox = (state = UI.WidgetBox, action) => {
  switch (action.type) {

    case TOGGLE_TREND_BOX: {
      return state.set('toggleTrendBox', !state.get('toggleTrendBox'));
    }

    default:
      return state;
  }
};

export default WidgetBox;
