import Footer from "../Footer";
import bgImg from "../../assets/img/contact2.jpg";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <>
    <div className="contactLanding">
    <img className="hotelLanding__image" src={bgImg} alt="Bergen docks taken from sea"/>

    <h2 id="contactH3">CONTACT</h2>
      <ContactForm />
      <Footer />
      </div>
    </>
  );
}
