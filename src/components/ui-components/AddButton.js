import React from 'react';
import styled from 'styled-components';

// Styled CSS
const AddBtn = styled.button`
  color: white;
  background-color: #5aac44;
  font-weight: bold;
  margin-right: 1em;
  &:hover {
    color: white;
  }
`;

// AddButton Functional Component 
export default function AddButton({ disabled, btnText, onClick }) {
  return (
    // Edit Save Button
    <AddBtn className='btn' disabled={disabled} onMouseDown={onClick}>
      {btnText}
    </AddBtn>
  );
}
