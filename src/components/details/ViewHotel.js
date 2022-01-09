import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../helpers/useAxios";
import Suggestions from "../Suggestions";
import Carousel from "nuka-carousel";
import Footer from "../Footer";
import FindUrl from "../FindUrl";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Enquiry from "../Enquiry";

export default function ViewHotel() {
  const [thisHotel, setThisHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  let { id } = useParams();
  const url = `wp/v2/pages/${id}`;

  useEffect(function() {
    async function getHotels() {
      try {
        const response = await http.get(url);
        setThisHotel(response.data);
      } catch (error) {
        console.log(error);
        setThisHotel(null);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading hotels...</div>;

  if (error) return <div>{}</div>;

  var para = thisHotel.excerpt.rendered;
  var hotelDesc = para.slice(3, -30);
  let removeDesc = hotelDesc.replace("Available Rooms", "");
  let newDesc = removeDesc.replace("Free Wifi", "");
  var imgUrl = FindUrl(thisHotel.content.rendered);
  let findPrice = thisHotel.content.rendered;
  let price = findPrice.slice(-13, -5);
  let wifi = thisHotel.content.rendered.match("Free Wifi");
  let rooms = thisHotel.content.rendered.match("Available Rooms");

  if (imgUrl !== null) {
    var newUrl = imgUrl[0];
    var img2 = imgUrl[7];
    var img3 = imgUrl[13];
    var trimUrl = newUrl.slice(0, -1);
  }

  return (
    <>
      <Col key={thisHotel.id} xl={1} className="hotelSpecific">
        <div className="hotelSpecific__box">
          <h1 className="hotelSpecific__header">{thisHotel.title.rendered}</h1>
        </div>
        <img
          className="hotelSpecific__image"
          alt="Hotel room or outside view"
          key={trimUrl}
          src={trimUrl}
        />
      </Col>
      <ul key={thisHotel.title} className="breadcrumb">
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/hotels/`}>Hotels</Link>
        </li>
        <li>{thisHotel.title.rendered}</li>
      </ul>
      <Col key={thisHotel.title.rendered} className="specificInfo">
        <h3 className="specificInfo__heading" key={thisHotel.id}>
          {thisHotel.title.rendered}
        </h3>
        <hr className="specificInfo__hr" />
        <Row sm={1}>
          <Col
            key={hotelDesc}
            xxl={6}
            xl={6}
            lg={6}
            sm={6}
            className="specificInfo__box"
          >
            <p className="specificInfo__para">{newDesc}</p>
            <p className="specificInfo__price">
              From: <span id="price">{price}</span> per night
            </p>
            <p className="specificInfo__wifi">* {wifi}</p>
            <p className="specificInfo__wifi">* {rooms}</p>
            <Enquiry />
          </Col>
          <Col
            key={trimUrl}
            xxl={5}
            xl={6}
            lg={6}
            sm={6}
            className="specificInfo__box2"
          >
            <Carousel>
              <img
                src={img3}
                alt="Hotel building"
                className="specificInfo__img"
              />
              <img
                src={img2}
                alt="Hotel building"
                className="specificInfo__img"
              />
              <img
                src={trimUrl}
                alt="Hotel building"
                className="specificInfo__img"
              />
            </Carousel>
          </Col>
        </Row>
      </Col>
      <Row>
        <Col className="suggestions">
          <hr className="suggestions__hr" />
          <h2 className="suggestions__h2">You might also like</h2>
          <Suggestions />
        </Col>
      </Row>

      <Footer />
    </>
  );
}
