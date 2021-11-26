import bgImg from "../../assets/img/bergen2small2.jpg";
import { Link } from "react-router-dom";
import HotelList from "./HotelList";
import Footer from "../Footer";

export default function Hotels() {
  return (
    <>
      <div className="hotelLanding">
        <img
          className="hotelLanding__image"
          src={bgImg}
          alt="Bergen docks taken from sea"
        />
      </div>
      <ul className="breadcrumb">
        <li><Link to={`/`}>Home</Link></li>
        <li>Hotels</li>
      </ul>
      <h2 id="hotelsH3">Hotels in Bergen</h2>
      <HotelList />
      <Footer />
    </>
  );
}
