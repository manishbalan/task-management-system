import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Modal } from "react-bootstrap";
import { addCard } from "../../redux/actions";
import styled from "styled-components";

// Styled CSS
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5em;
`;
// AddCard Functional Component 
export default function AddCard({ listId }) {
  const [formOpen, setFormOpen] = useState(false);
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const createCard = () => {
    setTask("");
    dispatch(addCard(listId, task));
  };
  // handleInputChange On Change Method 
  const handleInputChange = (ev) => {
    setTask(ev.target.value);
  };

  const toggleForm = () => {
    setFormOpen((prev) => !prev);
    setTask("");
  };

  //return Model 
  return (
    <div style={styles.container}>
      <Modal show={formOpen} onHide={toggleForm}>
        <Modal.Header>
          <Modal.Title style={styles.title}>Add Task</Modal.Title>
          <span style={styles.cancel} onClick={toggleForm}>  <i className="fas fa-times"></i></span>

        </Modal.Header>

        <Modal.Body>
          <TextareaAutosize
            minRows={3}
            autoFocus
            placeholder="Enter Task"
            onBlur={toggleForm}
            value={task}
            onChange={handleInputChange}
            style={styles.textArea}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={task.length === 0} onMouseDown={createCard}>
            Add Task
          </Button>
          <ActionContainer>
            <Button variant="outline-secondary" onClick={toggleForm}>
              Cancel
            </Button>
          </ActionContainer>
        </Modal.Footer>
      </Modal>
      <p
        style={styles.addAnother}
        onClick={() => {
          setFormOpen((prev) => !prev);
        }}
      >
        <span></span><i className="fas fa-plus"> </i> &nbsp; Add Task
      </p>
    </div>
  );
}

//Internal CSS
const styles = {
  container: {
    margin: "1em",
    color: "#5e6c84",
  },
  addAnother: {
    margin: "0.5em 1em",
    cursor: "pointer",
  },
  icon: {
    color: "#6b778c",
    fontSize: "1.5em",
    cursor: "pointer",
  },
  textArea: {
    resize: "none",
    width: "100%",
    padding: "8px",
  },
  title: {
    backgroundColor: "#ebecf0",
    borderRadius: "2px",
    minWidth: "475px",
    maxWidth: "272px",
    fontSize: '25px',
    textAlign: 'center',
  },
  cancel: {
    position: 'relative',
    right: 20,
    top: 7,
    cursor: 'pointer'
  }

};
