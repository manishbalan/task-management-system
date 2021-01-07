import { CONSTANTS } from '../actions';

const initialState = {
  past: {},
  present: {},
  future: {}
};

// cardReducer Functional Component 
const cardReducer = (state = initialState, action) => {

  // SWITCH CONDITION
  switch (action.type) {

    //ADD CASE
    case CONSTANTS.ADD_CARD: {
      const { text, listID, id } = action.payload;
      const newCard = {
        text,
        id: id,
        list: listID
      };
      return {
        ...state,
        past: { ...state.present },
        present: { ...state.present, [id]: newCard }
      };
    }

    //EDIT CASE
    case CONSTANTS.EDIT_CARD: {
      const { id, newText } = action.payload;
      const card = { ...state.present[id] };
      card.text = newText;
     return {
        ...state,
        past: { ...state.present },
        present: { ...state.present, [id]: card }
      };
    }

    default:
      return state;
  }
};

export default cardReducer;
