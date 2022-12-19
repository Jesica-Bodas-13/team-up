import "../App.css";
import axios from "axios";
import firebase from "firebase/compat/app";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";

function TaskModel() {
  const userID = Cookies.get("user");
  let navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  }

  const createTask = async () => {
    try {
      let title = document.getElementById("title").value;
      let description = document.getElementById("description").value;
      let startDate = document.getElementById("startDate").value;
      let endDate = document.getElementById("endDate").value;
      const data = {
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate
      };
      const idToken = await firebase.auth().currentUser.getIdToken();
      const header = {
        headers: {
          Authorization: "Bearer " + idToken,
        },
      };
      const res = await axios.post(`http://localhost:4000/task/${userID}`, data, header);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              id="description"
              name="description"
              autoFocus
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              id="startDate"
              name="startDate"
              autoFocus
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              id="endDate"
              name="endDate"
              autoFocus
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Link to={`/workspace/${userID}/tasks`}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Link>
        <Button onClick={createTask} variant="primary">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModel;