import React, { useState } from "react";
import { Row, Container, Col, Navbar, Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addList } from "../redux/actions/listActions";
import BoardContainer from "./board/BoardContainer";
import "./App.scss";

// App Functional Component 
function App() {
  const [show, setShow] = useState(false);
  const [userInfo, setuserInfo] = useState("");
  const dispatch = useDispatch();

  // Open Model handleUser Method 
  const handleUser = () => {
    setShow(true);
  };

   // handleInput Method
  const handleInput = (event) => {
    console.log(event.target.value);
    setuserInfo(event.target.value);
  };

  // Close Model handleClose Method 
  const handleClose = () => {
    setShow(false);
  };

  // Submit Model handleSubmit Method 
  const handleSubmit = () => {
    setShow(false);
    dispatch(addList(userInfo));
  };

  //return Components 
  return (
    <>
      <div className="App">
        <Navbar bg="light" className="mb-2">
          <Container>
            <Navbar.Brand style={{ fontSize: '30px' }}>Task Management</Navbar.Brand>
          </Container>
        </Navbar>
        <Row>
          <Container>
            <Col className="text-right">
              <Button variant="primary" onClick={handleUser}>
                ADD USER
              </Button>
            </Col>
            {/* BoardContainer Component */}
            <BoardContainer />
          </Container>
        </Row>

        {/* Model Start */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title style={styles.title}>ADD USER</Modal.Title>
            <span style={styles.cancel} onClick={handleClose}>  <i className="fas fa-times"></i></span>
          </Modal.Header >
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Name"
                  value={userInfo}
                  onChange={handleInput}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" disabled={userInfo.length === 0} type="submit">
                Submit
              </Button>{" "}
              <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
          </Form>
        </Modal>
        {/* Model End */}

      </div>
    </>
  );
}

//Internal CSS Start
const styles = {
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
//Internal CSS End

export default App;
