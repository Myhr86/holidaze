import bgImg from "../../assets/img/bergen2small2.jpg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import HotelList from "./HotelList";
import Footer from "../Footer";

const url = BASE_URL + TOKEN_PATH;
const privData = { username: "bruker", password: "Wjsnuy99." };

export default function Hotels() {
  const [auth, setAuth] = useContext(AuthContext);

  if (auth == undefined || null) {
    sgnIn();
  }

  async function sgnIn() {
    try {
      const response2 = await axios.post(url, privData);
      var responseData = response2.data;
      setAuth(responseData);
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  }
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
