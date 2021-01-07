import { combineReducers } from 'redux';
import listReducer from './listReducer';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  cards: cardReducer,
  lists: listReducer,
});

export default rootReducer;
