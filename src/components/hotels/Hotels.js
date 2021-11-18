import bgImg from "../../assets/img/bergen2small2.jpg";
import HotelList from "./HotelList";
import Footer from "../Footer";

export default function HomePage() {
  return (
    <>
        <div className="hotelLanding">
          <img className="hotelLanding__image" src={bgImg} alt="Bergen docks taken from sea"/>
          <div className="hotelLanding__elem">
            <h2 className="hotelLanding__header">
              OUR ACCOMMODATIONS
            </h2>
          </div>
        </div>
        <h3 id="hotelsH3">Hotels in Bergen</h3>
        <HotelList />
        <Footer />
    </>
  );
}
