import React from 'react';
import List from '../list/List';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { sort } from '../../redux/actions/listActions';
import styled from 'styled-components';

// Styled CSS
const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 2em;
`;

  // Board Arrow Functional Component 
  const Board = () => {
  const lists = useSelector(state => state.lists);
  const cards = useSelector(state => state.cards);

  const dispatch = useDispatch();

  // onDragEnd Functional Component
  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (destination) {
      dispatch(
        sort(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index,
          draggableId,
          type
        )
      );
    }
  };

  return (
     // Return Component 
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-lists' direction='horizontal' type='list'>
        {provided => (
          <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
            {Object.keys(lists.present).map((key, index) => {
              const list = lists.present[key];
              const listCards =
                list.cards.length > 0
                  ? list.cards
                    .map(cardID => cards.present[cardID])
                    .filter(card => card !== undefined)
                  : [];
              // Return List Component 
              return (
                <List
                  key={list.id}
                  id={list.id}
                  title={list.title}
                  cards={listCards}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
