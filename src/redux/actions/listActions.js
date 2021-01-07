import { CONSTANTS } from '.';
import { uuid } from 'uuidv4';

// addList Functional Component 
export const addList = title => {
  const id = uuid();
  return {
    type: CONSTANTS.ADD_LIST,
    payload: { title, id }
  };
};

// editList Functional Component 
export const editList = (id, title) => {
  return {
    type: CONSTANTS.EDIT_LIST,
    payload: { title, id }
  };
};

// archiveList Functional Component 
export const archiveList = (list, cards) => {
  return {
    type: CONSTANTS.ARCHIVE_LIST,
    payload: { list, cards }
  };
};

 
export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: CONSTANTS.DRAGGED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  };
};
