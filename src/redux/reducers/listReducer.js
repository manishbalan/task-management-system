import { CONSTANTS } from '../actions';
import { uuid } from 'uuidv4';

const initialState = {
  past: [],
  present: [],
  future: []
};
 
// listReducer Functional Component 
const listReducer = (state = initialState, action) => {

  // SWITCH CONDITION
   switch (action.type) {

    // ADD LIST CASE
    case CONSTANTS.ADD_LIST: {
      const { title } = action.payload;
      const id = uuid();
      const newList = {
        title: title,
        cards: [],
        id
      };

      const newState = {
        ...state,
        past: [...state.present],
        present: [...state.present, newList]
      };
      return newState;
    }

    // EDIT LIST CASE
    case CONSTANTS.EDIT_LIST: {
      const { title, id } = action.payload;
      const newPresent = state.present.map(list => {
        if (list.id === id) {
          return {
            ...list,
            title
          };
        } else {
          return list;
        }
      });

      const newState = {
        ...state,
        past: [...state.present],
        present: newPresent
      };
      return newState;
    }

     // ARCHIVE LIST CASE
    case CONSTANTS.ARCHIVE_LIST: {
      const { list: archivedList } = action.payload;
      const newPresent = state.present.filter(
        list => list.id !== archivedList.id
      );

      const newState = {
        ...state,
        past: [...state.present],
        present: newPresent
      };
      return newState;
    }

     // ADD CARD CASE
    case CONSTANTS.ADD_CARD: {
      const { listID, id } = action.payload;
      const newPresent = state.present.map(list => {
        if (list.id === listID) {
          return {
            ...list,
            cards: [...list.cards, id]
          };
        } else {
          return list;
        }
      });

      const newState = {
        ...state,
        past: [...state.present],
        present: newPresent
      };
      return newState;
    }

     // ARCHIVE CARD CASE
     case CONSTANTS.ARCHIVE_CARD: {
      const { card } = action.payload;

      const list = state.present.find(list => list.id === card.list);
      let newCards = [...list.cards];

      newCards = newCards.filter(cardID => cardID !== card.id);

      const newPresent = state.present.map(list => {
        if (list.id === card.list) {
          return {
            ...list,
            cards: newCards
          };
        } else {
          return list;
        }
      });

      const newState = {
        ...state,
        past: [...state.present],
        present: newPresent
      };
      return newState;
    }

    // DRAGGED CASE
    case CONSTANTS.DRAGGED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
      } = action.payload;

      let newPresent;
      if (type === 'list') {
        newPresent = [...state.present];
        const list = newPresent.splice(droppableIndexStart, 1);
        newPresent.splice(droppableIndexEnd, 0, ...list);
      } else {
        //same container
        if (droppableIdStart === droppableIdEnd) {
          const startList = state.present.find(
            list => droppableIdStart === list.id
          );
          const startListNewCards = [...startList.cards];
          const card = startListNewCards.splice(droppableIndexStart, 1);
          startListNewCards.splice(droppableIndexEnd, 0, ...card);

          newPresent = state.present.map(list => {
            if (list.id === startList.id) {
              return {
                ...startList,
                cards: startListNewCards
              };
            } else {
              return list;
            }
          });
        } else {
          const startList = state.present.find(
            list => droppableIdStart === list.id
          );
          const endList = state.present.find(
            list => droppableIdEnd === list.id
          );

          const startListNewCards = [...startList.cards];
          const endListNewCards = [...endList.cards];

          const card = startListNewCards.splice(droppableIndexStart, 1);
          endListNewCards.splice(droppableIndexEnd, 0, ...card);

          newPresent = state.present.map(list => {
            if (list.id === startList.id) {
              return {
                ...startList,
                cards: startListNewCards
              };
            } else if (list.id === endList.id) {
              return {
                ...endList,
                cards: endListNewCards
              };
            } else {
              return list;
            }
          });
        }
      }
      const newState = {
        ...state,
        past: [...state.present],
        present: newPresent
      };
      return newState;
    }

   default:
      return state;
  }
};

export default listReducer;
