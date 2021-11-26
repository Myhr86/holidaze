import Footer from "../Footer";
import bgImg from "../../assets/img/login2.jpg";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="loginLanding">
        <img
          className="loginLanding__image"
          src={bgImg}
          alt="Bergen docks taken from sea"
        />
        <ul className="breadcrumb">
          <li><Link to={`/`}>Home</Link></li>
          <li>Login Form</li>
        </ul>
        <h2 id="loginH2">Login Form</h2>
        <LoginForm />
        <Footer />
      </div>
    </>
  );
}
