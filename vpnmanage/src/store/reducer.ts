
import { AppState } from '@/store/types';

const defaultState: AppState = {
  num: 20,
};

const reducer = (state = defaultState): AppState => {
  let newState = JSON.parse(JSON.stringify(state));

  return newState;
};

export default reducer;