import React from "react";
import bgImg from "../../assets/img/bergenBlue.jpg";
import pillow from "../../assets/img/pillow1.jpg";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Search from "../Search";
import FadeBoxes from "../FadeBoxes";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";

const url = BASE_URL + TOKEN_PATH;
const privData = { username: "bruker", password: "lightaccess" };

export default function HomePage() {
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
      <Col className="block" id="search">
        <img
          className="block__image"
          src={bgImg}
          alt="People walking at the docks in Bergen "
        />
        <div className="block__elem">
          <h2 className="block__header">
            COME EXPERIENCE THE BEST ACCOMMODATIONS BERGEN CITY HAS TO OFFER!
            TRIPS CUSTOMIZED JUST FOR YOU.{" "}
          </h2>
          <div className="searchContainer">
            <Search />
          </div>
        </div>
        <h3 id="experienceH3">Experience Bergen</h3>
      </Col>
      <FadeBoxes />
      <Row xs={1} sm={1} lg={2} xl={2} xxl={2} className="hotelBlock">
        <Col xs={12} lg={6} xl={6} xxl={6} className="hotelBlock__elem">
          <img
            className="hotelBlock__image"
            src={pillow}
            alt="A pillow on a hotel bed"
          />
        </Col>
        <Col xs={12} md={12} xl={6} xxl={6} className="hotelBlock__elem">
          <h3 className="hotelBlock__heading">Find your accommodation</h3>
          <p className="hotelBlock__para">
            Holidaze has a big selection of high quality accommodations. Either
            you are traveling with family, backpacking with friends or traveling
            alone, Holidaze has what you seek.
          </p>
          <Link to={`/hotels`}>
            <Button>View All Hotels</Button>
          </Link>
        </Col>
      </Row>
      <Footer />
    </>
  );
}
