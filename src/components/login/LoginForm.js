import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password")
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      console.log(data);
      setAuth(response.data);
      history.push("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError("Wrong username or password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Container fluid>
        <Form
          id="loginForm"
          className="forms"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3">
            {loginError && <FormError>{loginError}</FormError>}
            <fieldset disabled={submitting}>
              <div id="loginInput" className="form-group">
                <input
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  ref={register}
                />
                {errors.username && (
                  <FormError>{errors.username.message}</FormError>
                )}
              </div>

              <div id="loginInput2" className="form-group">
                <input
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  ref={register}
                  type="password"
                />
                {errors.password && (
                  <FormError>{errors.password.message}</FormError>
                )}
              </div>
              <button id="loginButton" className="btn btn-primary loginBtn">
                {submitting ? "Loggin in..." : "Login"}
              </button>
            </fieldset>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
