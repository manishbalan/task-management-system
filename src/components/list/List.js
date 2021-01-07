import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import Card from "../card/Card";
import AddCard from "../card/AddCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ListForm from "./ListForm";
import { editList,  archiveList, } from "../../redux/actions/listActions";

// Styled CSS Start
const ListContainer = styled.div`
  background-color: #ebecf0;
  margin-right: 1em;
  border-radius: 3px;
  min-width: 272px;
  max-width: 272px;
`;
 
const EditButton = styled.div`
  position: absolute;
  right: 45px;
  top: 5px;
  opacity: 0.5;
  ${ListContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
    color: #bf4600;
  }
`;

const ArchiveButton = styled.div`
  position: absolute;
  right: 15px;
  top: 5px;
  opacity: 0.5;
  ${ListContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
    color: #bf4600;
  }
`;
// Styled CSS End

// List Functional Component
const List = ({ id, title, cards = [], index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setTitle] = useState(title);
  const [Open, setOpen] = useState(false);

  const dispatch = useDispatch();

  //Add List
  const saveChanges = (e) => {
    e.preventDefault();
    dispatch(editList(id, listTitle));
    setIsEditing(false);
  };

  const handleInputChange = (ev) => {
    setTitle(ev.target.value);
  };
  //toggleEdit function
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  //archive function
  const archive = () => {
    dispatch(archiveList({ id, title }, cards));
    setIsEditing(false);
  };
  //handleClose function
  const handleClose = () => {
    setOpen(!Open);
  };

  return (
    <>
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <ListContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {isEditing ? (
              /* List  Component */
              <ListForm
                text={listTitle}
                buttonText="Save"
                toggleForm={toggleEdit}
                handleInputChange={handleInputChange}
                onSubmit={saveChanges}
              />
            ) : (
                <div style={{ position: "relative" }}>
                  <h2 style={styles.title}>{title}</h2>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit User Name</Tooltip>}
                  > 
                    {/* Edit List */}  
                    <EditButton onClick={toggleEdit}>
                      <span>
                        &nbsp;
                      <i className="fas fa-pen"></i>
                      </span>
                    </EditButton>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top" style={styles.title}
                    overlay={<Tooltip >Delete User</Tooltip>}
                  >
                     {/* Delete List */}  
                    <ArchiveButton onClick={() => setOpen(!Open)}>
                      <span>
                        &nbsp;
                      <i className="fas fa-times"></i>
                      </span>
                    </ArchiveButton>
                  </OverlayTrigger>
                </div>
              )}
            <Droppable droppableId={String(id)}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {cards.map((card, index) => (

                    /* Card Component */
                    <Card
                      key={card.id}
                      index={index}
                      text={card.text}
                      id={card.id}
                      listId={id}
                    />
                  ))}
                  {provided.placeholder}

                 {/*  Add Component */}
                  <AddCard listId={id} />
                </div>
              )}
            </Droppable>
          </ListContainer>
        )}
      </Draggable>

      {/* Model Start */}
      <Modal show={Open} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title style={styles.titlec}>Delete User</Modal.Title>
          <span style={styles.cancel} onClick={handleClose}>  <i className="fas fa-times"></i></span>
        </Modal.Header>
        <Modal.Body>
          <p style={styles.user}>Are you sure, would you like to delete User? .</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={archive}>Confirm</Button>
        </Modal.Footer>
      </Modal>
         {/* Model End  */}
    </>
  );
};

// Internal CSS Start
const styles = {
  container: {
    backgroundColor: "#ebecf0",
    marginRight: "1em",
    borderRadius: "3px",
    minWidth: "272px",
    maxWidth: "272px",
  },
  actionContainer: {
    position: "relative",
  },
  title: {
    padding: "10px",
    fontSize: "1.2em",
    wordBreak: "break-all",
    width: "70%",
  },
  cancel: {
    position: 'relative',
    right: 20,
    top: 7,
    cursor: 'pointer'
  },
  titlec: {
    backgroundColor: "#ebecf0",
    borderRadius: "2px",
    minWidth: "475px",
    maxWidth: "272px",
    fontSize: '25px',
    textAlign: 'center',
  },
  user: {
    fontSize: '20px',
  }
};
// Internal CSS End

export default List;
