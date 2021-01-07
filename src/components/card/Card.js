import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardForm from "./CardForm";
import { editCard } from "../../redux/actions";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { archiveCard } from "../../redux/actions/cardActions";

// Styled CSS
const CardContainer = styled.div`
  margin-bottom: 0.5rem !important;
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
`;
// Styled CSS
const EditButton = styled.div`
  position: absolute;
  display: none;

  right: 40px;
  bottom: 0px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    color: #bf4600;
    opacity: 0.8;
  }
`;
// Styled CSS
const ArchiveButton = styled.div`
  position: absolute;
  display: none;
  right: 10px;
  bottom: 0px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    color: #bf4600;
    opacity: 0.8;
  }
`;
// Card arrow functional component 
const Card = ({ id, text, index, listId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  //Save card Function 
  const saveCard = (e) => {
    e.preventDefault();
    setText(cardText);
    dispatch(editCard(id, cardText));
    setIsEditing(false);
  };

  //On change method 
  const handleInputChange = (ev) => {
    setText(ev.target.value);
  };
  // Edit Toggle
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  //Function Delete Card
  const archive = () => {
    dispatch(archiveCard({ id, text, list: listId }));
    setIsEditing(false);
  };
// Card render Function
  const renderCard = () => {
    return !search || text.toUpperCase().includes(search.toUpperCase()) ? (
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <CardContainer
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Edit Task</Tooltip>}
            >
              <EditButton onClick={toggleEdit}>
                <span>
                  &nbsp;
                  <i className="fas fa-pen"></i>
                </span>
              </EditButton>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Delete Task</Tooltip>}
            >
              <ArchiveButton onClick={archive}>
                <span>
                  &nbsp;
                  <i className="fas fa-times"></i>
                </span>
              </ArchiveButton>
            </OverlayTrigger>

            <div className="card-body" style={styles.cardBody}>
              {text}
            </div>
          </CardContainer>
        )}
      </Draggable>
    ) : (
        <> </>
      );
  };
  // Edit function
  const renderEditForm = () => {
    return (
      <div style={styles.container}>
        <CardForm
          text={cardText}
          toggleForm={toggleEdit}
          buttonText="Save"
          handleInputChange={handleInputChange}
          onSubmit={saveCard}
        />
      </div>
    );
  };
  return isEditing ? renderEditForm() : renderCard();
};

//Internal CSS
const styles = {
  container: {
    margin: "0.5rem",
    color: "#5e6c84",
  },
  card: {
    margin: "20px",
    borderRadius: "3px",
    height: "auto",
    wordWrap: "break-word",
  },
  cardBody: {
    padding: "5px 10px",
    marginBottom: "20px",
  },
};

export default Card;
