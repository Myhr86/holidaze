import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import FormError from "../common/FormError";
import useAxios from "../../hooks/useAxios";

const schema = yup.object().shape({
  name: yup.string().required("Title is required"),
  subject: yup.string().required("Please enter your full name"),
  message: yup.string().required("Please enter your message")
});

const url = BASE_URL + TOKEN_PATH;

export default function AddPost() {
  const [auth, setAuth] = useContext(AuthContext);
  const [auth2, setAuth2] = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxios();

  if (auth == null) {
    (async function onEnter() {
      const data2 = { username: "bruker", password: "Bruker2021" };
      console.log(data2);
      try {
        const response2 = await axios.post(url, data2);
        setAuth2(response2.data);
      } catch (error) {
        console.log("error", error);
        setServerError(error.toString());
      } finally {
      }
    })();
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    try {
      console.log(auth);
      var content = (data.content, data.email, data.message);
      const response1 = await http.post("/wp/v2/myforms/236", content, {mode:'cors'});
      console.log("response", response1.content);
      console.log("response", response1.data.content);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form name="form-data" id="form-data" onSubmit={handleSubmit(onSubmit)}>
        {serverError && <FormError>{serverError}</FormError>}
        <fieldset disabled={submitting}>
          <div>
            <input type="text" id="content" name="content" placeholder="Name" ref={register} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </div>
          <div>
            <input type="text" name="message" placeholder="Email" ref={register} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>
          <div>
            <textarea name="message" placeholder="Content" ref={register} />
          </div>

          <button className="btn btn-primary">
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </fieldset>
      </form>
    </>
  );
}
