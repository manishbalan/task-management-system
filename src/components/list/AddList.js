import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../../redux/actions/listActions';
import styled from 'styled-components';
import ListForm from './ListForm';

// Styled CSS
const AddListContainer = styled.div`
  min-width: 272px;
  color: #fff;
`;
// Styled CSS
const AddAnotherList = styled.p`
  background-color: hsla(0, 0%, 100%, 0.24);
  padding: 10px;
  font-size: 1.1em;
  color: white;
  cursor: pointer;
  border-radius: 3px;
`;

// AddList Functional Component 
const AddList = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  //createList Method
  const createList = () => {
    if (text.length > 0) {
      dispatch(addList(text));
      setText('');
    }
  };

  const handleInputChange = ev => {
    setText(ev.target.value);
  };

  const toggleForm = () => {
    setFormOpen(!formOpen);
    setText('');
  };

  // renderForm Method 
  const renderForm = () => (
    <ListForm
      text={text}
      buttonText='Add User'
      toggleForm={toggleForm}
      handleInputChange={handleInputChange}
      onSubmit={createList}
    />
  );
  // renderButton Method 
  const renderButton = () => (
    <AddAnotherList
      onClick={() => {
        setFormOpen(prev => !prev);
      }}
    >
      <i className='fas fa-plus'> </i> &nbsp; Add User
    </AddAnotherList>
  );
  return (
    <AddListContainer>
      {formOpen ? renderForm() : renderButton()}
    </AddListContainer>
  );
};

export default AddList;
