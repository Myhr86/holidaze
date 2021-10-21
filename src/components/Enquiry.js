import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function Enquiry() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button id="enquiryBtn" variant="primary" onClick={handleShow}>
        Send Enquiry
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enquire us about your trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Row xl={2}>
          <Col xl={6}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="password" placeholder="First Name" />
          </Form.Group>
          </Col>
            <Col xl={6}>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="password" placeholder="Last Name" />
          </Form.Group>
          </Col>
          </Row>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
          <Form.Label>Leave us your message here</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
          />
          </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
