import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
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

		data.status = "publish";

		try {
      var newData = (data.name + "|" + data.email + "|" + data.subject + "|" + data.message);
      data = {content: newData, title: data.subject, status: "publish"};
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
			<form onSubmit={handleSubmit(onSubmit)}>
				{serverError && <FormError>{serverError}</FormError>}
				<fieldset disabled={submitting}>
					<div>
						<input name="name" placeholder="Full Name" ref={register}/>
						{errors.title && <FormError>{errors.title.message}</FormError>}
					</div>

          <div>
						<input name="email" placeholder="Email" ref={register} />
					</div>

          <div>
						<input name="subject" placeholder="Subject" ref={register} />
					</div>

					<div>
						<textarea name="message" placeholder="Your Message.." ref={register} />
					</div>

					<button className="btn btn-primary">{submitting ? "Submitting..." : "Submit"}</button>
				</fieldset>
			</form>
		</>
	);
}
