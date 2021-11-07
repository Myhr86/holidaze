import React, { useState, useEffect } from "react";
import { useContext } from "react";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import useAxios from "./hotels/useAxios";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { BASE_URL, TOKEN_PATH } from "../constants/api";
const url = BASE_URL + TOKEN_PATH;
const privData = ({username:"bruker", password:"Wjsnuy99."});

export default function Enquiry() {
  const [auth, setAuth] = useContext(AuthContext);
  const schema = yup.object().shape({
  	firstName: yup.string().required("Title is required"),
  });

  const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

  console.log(auth);
  async function sgnIn() {
    try {
      const response2 = await axios.post(url, privData);
      console.log("response2", response2.data);
      var responseData = response2.data;
      console.log(response2.data)
      setAuth(responseData);
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  }
if (auth === null) {
  sgnIn();
  }

async function signIn() {
  if (auth === null) {
  try {
    const response2 = await axios.post(url, privData);
    console.log("response2", response2.data);
    var responseData = response2.data;
    setAuth(responseData);
    console.log(auth);

  } catch (error) {
    console.log("error", error);
  } finally {
  }
}
}

const [submitting, setSubmitting] = useState(false);
const [serverError, setServerError] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [hotels, setHotels] = useState([]);
	const [error, setError] = useState(null);

  const http = useAxios();
  let { id } = useParams();

  useEffect(function() {
    async function getHotels() {
      try {
        const response = await http.get("wp/v2/pages");
        setHotels(response.data);
        console.log(response)
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {

      }
    }

    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /*event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.firstName.value;
    const email = event.target.email.value;
    const message = event.target.firstName.value;*/
    {hotels.map(hotel => {
      if(id == hotel.id) {
        console.log(hotel.title.rendered)

      }
    })}


  async function onSubmit(data) {
    console.log("yo")
    setSubmitting(true);
    setServerError(null);
    data.status = "publish";

    try {
      console.log(data.target.form.data)
      const response = await http.post("/acf/v3/posts", data);
      console.log("response", response.data);

    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }


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
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row xl={2}>
          <Col xl={6}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" placeholder="First Name" ref={register} />
          </Form.Group>
          </Col>
            <Col xl={6}>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" ref={register} />
          </Form.Group>
          </Col>
          </Row>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={register} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
          <Form.Label>Leave us your message here</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            ref={register}
          />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="btn btn-primary">{submitting ? "Submitting..." : "Submit"}</button>
          </Form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  );
}
