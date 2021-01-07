import { CONSTANTS } from '.';
import { uuid } from 'uuidv4';

// addCard Functional Component 
export const addCard = (listID, text) => {
  const id = uuid();
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listID, id }
  };
};

// editCard Functional Component 
export const editCard = (id, newText) => {
  return {
    type: CONSTANTS.EDIT_CARD,
    payload: { id, newText }
  };
};

// archiveCard Functional Component 
export const archiveCard = (card, listID) => {
  return {
    type: CONSTANTS.ARCHIVE_CARD,
    payload: { card, listID }
  };
};
