import Footer from "../Footer";
import bgImg from "../../assets/img/contact2.jpg";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <>
      <div className="contactLanding">
        <img
          className="hotelLanding__image"
          src={bgImg}
          alt="Bergen docks taken from sea"
        />

        <ul className="breadcrumb">
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>Contact Form</li>
        </ul>
        <h2 id="contactH2">CONTACT</h2>
        <h2 id="contactH2Mob">CONTACT FORM</h2>
        <ContactForm />
        <Footer />
      </div>
    </>
  );
}
