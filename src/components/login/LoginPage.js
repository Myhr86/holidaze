import Footer from "../Footer";
import bgImg from "../../assets/img/login2.jpg";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="loginLanding">
      <img className="loginLanding__image" src={bgImg} alt="Bergen docks taken from sea"/>
      <h3 id="contactH3">Login Form</h3>
      <LoginForm />
      <Footer />
      </div>
    </>
  );
}
