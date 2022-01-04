import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const url = BASE_URL + TOKEN_PATH;
const privData = { username: "bruker", password: "lightaccess" };

export default function AddPost() {
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
    name: yup.string().required("Title is required")
  });

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxios();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);
    data.status = "publish";

    try {
      var newData =
        data.name + "|" + data.email + "|" + data.subject + "|" + data.message;
      data = { content: newData, title: data.subject, status: "publish" };
      const response = await http.post("/wp/v2/myforms", data);
      window.location.reload();
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
      <Row className="formWrapper">
        <Col className="formWrapper__col" xxl={7} lg={7} md={12} sm={12}>
          <Form
            id="contactForm"
            className="contactForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            {serverError && <FormError>{serverError}</FormError>}
            <div className="formHeader">
              <h3 className="formHeader__heading">Contact Form</h3>
            </div>
            <fieldset className="contactField" disabled={submitting}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  name="name"
                  placeholder="Full Name"
                  ref={register}
                />
                {errors.title && <FormError>{errors.title.message}</FormError>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  ref={register}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  className="form-control"
                  name="subject"
                  placeholder="Subject"
                  ref={register}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  placeholder="Your Message.."
                  ref={register}
                />
              </div>

              <button id="contactBtn" className="btn btn-primary">
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </fieldset>
          </Form>
        </Col>
        <Col xxl={3} md={3} sm={12} className="contactInfo">
          <h3 className="contactInfo__h3">More Ways of Contacting Us</h3>
          <hr className="contactInfo__hr" />
          <h4 className="contactInfo__h4">Phone</h4>
          <p className="contactInfo__p">
            Give us a call if you have questions about anything.
          </p>
          <p className="contactInfo__p">+47 740 40 163</p>
          <h4 className="contactInfo__h4">Email</h4>
          <p className="contactInfo__p">holidaze@info.com</p>
          <h4 className="contactInfo__h4">Adress</h4>
          <p className="contactInfo__p">Bergen Street 47,</p>
          <p className="contactInfo__p">7650 Bergen,</p>
          <p className="contactInfo__p">Norway</p>
          <h3 className="contactInfo__h3">
            We'd love to hear from you on social media as well!
          </h3>
          <hr className="contactInfo__hr" />
          <div className="contactInfo__icons">
            <FontAwesomeIcon id="face" icon={["fab", "facebook"]} />
            <FontAwesomeIcon id="insta" icon={["fab", "instagram"]} />
            <FontAwesomeIcon id="twit" icon={["fab", "twitter"]} />
          </div>
        </Col>
      </Row>
      <Row className="mapWrapper">
        <h3 className="mapWrapper__h3">You Can Find Us Here</h3>
        <iframe
          className="mapWrapper__iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d957.4505092720449!2d5.315255869594085!3d60.39548216094849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cfc1cb03b2cd3%3A0x9693fd5074636ec8!2sHolbergsallmenningen%205B%2C%205005%20Bergen!5e0!3m2!1sen!2sno!4v1637397305681!5m2!1sen!2sno"
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
          title="holidazeMap"
        />
      </Row>
    </>
  );
}
