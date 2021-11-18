import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

const url = BASE_URL + TOKEN_PATH;
const privData = ({username:"bruker", password:"Wjsnuy99."});

export default function AddPost() {
  const [auth, setAuth] = useContext(AuthContext);
  if (auth == undefined || null) {
    sgnIn();
    }

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

const schema = yup.object().shape({
	name: yup.string().required("Title is required"),
});

	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);

	const history = useHistory();
	const http = useAxios();

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);
    console.log(auth);
		data.status = "publish";

		try {
      console.log(auth)
      var newData = (data.name + "|" + data.email + "|" + data.subject + "|" + data.message);
      data = {content: newData, title: data.subject, status: "publish"};
      console.log(data)
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
			<Form onSubmit={handleSubmit(onSubmit)}>
				{serverError && <FormError>{serverError}</FormError>}
				<fieldset className="contactField" disabled={submitting}>
					<div className="form-group">
            <label htmlFor="name">Name</label>
						<input className="form-control" name="name" placeholder="Full Name" ref={register}/>
						{errors.title && <FormError>{errors.title.message}</FormError>}
					</div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
						<input className="form-control" name="email" placeholder="Email" ref={register} />
					</div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
						<input className="form-control" name="subject" placeholder="Subject" ref={register} />
					</div>

					<div className="form-group">
            <label htmlFor="message">Message</label>
						<textarea className="form-control" name="message" placeholder="Your Message.." ref={register} />
					</div>

					<button id="contactBtn" className="btn btn-primary">{submitting ? "Submitting..." : "Submit"}</button>
				</fieldset>
			</Form>
		</>
	);
}
