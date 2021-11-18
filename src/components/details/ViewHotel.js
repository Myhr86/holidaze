import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hotels/useAxios";
import Footer from "../Footer";
import FindUrl from "../FindUrl";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Enquiry from "../Enquiry";

export default function ViewHotel() {
  const [hotels, setHotels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  const http = useAxios();

  let { id } = useParams();

  useEffect(function() {
    async function getHotels() {
      try {
        const response = await http.get("wp/v2/pages");
        setHotels(response.data);
        console.log(response)
      } catch (error) {
        console.log(error);
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

  return (
    <>
      {hotels.map(hotel => {
        let para = hotel.excerpt.rendered
        let hotelDesc = para.slice(3, -5)
        let imgUrl = FindUrl(hotel.content.rendered)
        if (imgUrl !== null) {
          var newUrl = imgUrl[0]
          var trimUrl = newUrl.slice(0, -1)
        }

        if (id == hotel.id) {
          return (
            <>
            <Col xl={1} className="hotelSpecific">
              <div className="hotelSpecific__box">
                <h1 className="hotelSpecific__header">{hotel.title.rendered}</h1>
              </div>
              <img className="hotelSpecific__image" alt="Hotel room or outside view" key={trimUrl} src={trimUrl}></img>
            </Col>
            <Col className="specificInfo">
              <h3 className="specificInfo__heading" key={hotel.id}>{hotel.title.rendered}</h3>
              <hr className="specificInfo__hr"/>
              <Row sm={1}>
              <Col xxl={6} xl={6} lg={6} sm={6} className="specificInfo__box">
                <p className="specificInfo__para">{hotelDesc}</p>
                <Enquiry />
              </Col>
              <Col xxl={6} xl={6} lg={6} sm={6} className="specificInfo__box2">
                <img className="specificInfo__img" src={trimUrl}></img>
              </Col>

            </Row>
            </Col>
            <Footer />
            </>
          );
          }
      })}
    </>
  );
}
