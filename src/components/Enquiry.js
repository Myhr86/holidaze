import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { FcCalendar } from "react-icons/fc";
import Row from "react-bootstrap/Row";
import { BASE_URL, TOKEN_PATH } from "../constants/api";

const url = BASE_URL + TOKEN_PATH;
const privData = { username: "bruker", password: "Wjsnuy99." };

export default function Enquiry() {
  const [thisHotel, setThisHotel] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  if (auth == undefined || null) {
    sgnIn();
  }

  async function sgnIn() {
    try {
      const response2 = await axios.post(url, privData);
      var responseData = response2.data;
      setAuth(responseData);
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  }

  const schema = yup.object().shape({
    firstName: yup.string().required("Title is required")
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const [submitting, setSubmitting] = useState(false);
  const [, setServerError] = useState(null);
  const [show, setShow] = useState(false);
  const [enquiryMsg, setEnquiryMsg] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEnq = () => {
    setShow(false);
    setEnquiryMsg(false);
  }
  const handleShowEnq = () => setEnquiryMsg(true);
  const [hotels, setHotels] = useState([]);
  const [, setError] = useState(null);

  const [calDate] = useState(new Date());
  const [constPrice, setConstPrice] = useState(Number);
  let [roomPrice, setRoomPrice] = useState(null);
  let [days, setDays] = useState(1);

  const offset2 = calDate.getTimezoneOffset();
  let todayDate;
  todayDate = new Date(calDate.getTime() - offset2 * 60 * 1000);
  todayDate = calDate.toISOString().substring(0, 10);
  const [newDate, setNewDate] = useState(todayDate);

  function openCal() {
    const reactCal = document.querySelector(".react-calendar");
    reactCal.style.display = "block";
  }

  function onChange(calDate, event) {
    const reactCalTile = document.querySelectorAll(".react-calendar__tile");
    for (let i = 0; i < reactCalTile.length; i++) {
      const tile = event.target;
      reactCalTile[i].style.background = "none";
      if (tile === reactCalTile[i]) {
        reactCalTile[i].style.background = "green";
      } else if (tile.matches("abbr")) {
        tile.parentNode.style.background = "green";
      } else {
        tile.parentNode.style.background = "none";
      }
    }

    const offset = calDate.getTimezoneOffset();
    calDate = new Date(calDate.getTime() - offset * 60 * 1000);
    calDate = calDate.toISOString().substring(0, 10);
    setNewDate(calDate);
    const reactCal = document.querySelector(".react-calendar");
    reactCal.style.display = "none";
    //reactCalTile.addEventListener("click",)
  }

  const http = useAxios();
  let { id } = useParams();

  useEffect(function() {
    async function getHotels() {
      try {
        const response = await http.get("wp/v2/pages/");
        setHotels(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
      }
    }

    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (thisHotel == null || undefined) {
    hotels.map(hotel => {
      if (id == hotel.id) {
        let findPrice = hotel.content.rendered;
        let price = findPrice.slice(-13, -5);
        setRoomPrice(price);
        setConstPrice(price);
        var thisHotel = hotel.title.rendered;
        setThisHotel(thisHotel);
      }
    });
  }

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    try {
      var newData =
        data.firstName +
        "|" +
        data.lastName +
        "|" +
        data.email +
        "|" +
        data.calDate +
        "|" +
        data.days +
        "|" +
        data.message;
      data = { content: newData, title: thisHotel, status: "publish" };
      const response = await http.post("/wp/v2/enquiries", data);
      //window.location.reload();
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  function calculate(e) {
    e.preventDefault();
    days++;
    let updateConstPrice = parseInt(constPrice);
    roomPrice = updateConstPrice * days;
    setDays(days);
    setRoomPrice(roomPrice);
  }

  function calculateMinus(e) {
    e.preventDefault();
    days--;
    let updatePrice = parseInt(roomPrice);
    let updateConstPrice = parseInt(constPrice);
    roomPrice = updatePrice - updateConstPrice;
    setDays(days);
    setRoomPrice(roomPrice);
  }

  function handleSubmitDays(event) {
    console.log(event);
    event.preventDefault();
  }

  return (
    <>
      <Button id="enquiryBtn" variant="primary" onClick={handleShow}>
        Send Enquiry
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enquire us about {thisHotel}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row xl={2}>
              <Col xl={6}>
                <Form.Group className="mb-3 enqForm" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    ref={register}
                  />
                </Form.Group>
              </Col>
              <Col xl={6}>
                <Form.Group className="mb-3 enqForm" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    ref={register}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3 enqForm" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                ref={register}
              />
            </Form.Group>
            <Form.Group className="mb-3 enqForm enqForm2" controlId="message">
              <Form.Label>Your Enquriy</Form.Label>
              <p className="enquiryP">
                Leave a comment if you have questions or wishes regarding this
                hotel. You will hear back from us shortly.
              </p>
              <Form.Control
                name="message"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                ref={register}
              />
            </Form.Group>
            <Calendar onChange={onChange} value={calDate} />
            <FcCalendar className="calendar" onClick={openCal} />
            <Form.Group className="mb-3 enqForm" controlId="newDate">
              <Form.Control
                type="text"
                name="calDate"
                onChange={handleSubmitDays}
                value={newDate}
                ref={register}
              />
            </Form.Group>

            <Form.Group className="mb-3 enqForm daysContainer" controlId="days">
              <Form.Label>Number of nights</Form.Label>
              <button name="remove" onClick={calculateMinus}>
                -
              </button>
              <Form.Control
                name="days"
                type="text"
                onChange={handleSubmitDays}
                value={days}
                ref={register}
              />
              <button name="plus" onClick={calculate}>
                +
              </button>
            </Form.Group>
            <p className="roomPrice">
              <span>Price: </span>
              {parseInt(roomPrice)} NOK
            </p>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button onClick={handleShowEnq} className="btn btn-primary">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>

      <Modal className="modalBody" show={enquiryMsg} onHide={handleCloseEnq}>
        <Modal.Header className="modalBody__header" closeButton>
        </Modal.Header>
        <Modal.Body className="modalBody__padding">
          <h3>Thank you! Your enquiry has been successfully sent</h3>
        </Modal.Body>
      </Modal>
    </>
  );
}
