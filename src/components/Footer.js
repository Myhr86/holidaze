import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Row>
          <Col sm={8} xs={6} className="footer__elem">
            <p className="footerP">
              Holidaze <span>|</span> Bergen, Norway <span>|</span>{" "}
              info@holidaze.com <span>|</span> +47 924 07 349
            </p>
            <div className="icons">
              <a href="https://facebook.com/holidaze"><FontAwesomeIcon icon={["fab", "facebook"]} /></a>
              <a href="https://instagram.com/holidaze"><FontAwesomeIcon icon={["fab", "instagram"]} /></a>
              <a href="https://twitter.com/holidaze"><FontAwesomeIcon icon={["fab", "twitter"]} /></a>
            </div>
          </Col>
          <Col className="footer__elem">
            <Row className="footer__row">
              <Col md={4}>
                <h4 className="footer__h4">Visitors</h4>
                <hr className="footer__hr"></hr>
                <ul className="footer__ul">
                  <li className="footer__li"><Link to={`/hotels/`}>Our Hotels</Link></li>
                  <li className="footer__li"><Link to={`/contact/`}>Contact Us</Link></li>
                </ul>
              </Col>
              <Col md={3}>
                <h4 className="footer__h4">Admin</h4>
                <hr className="footer__hr"></hr>
                <ul className="footer__ul">
                  <li className="footer__li"><Link to={`/login/`}>Login</Link></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </footer>
    </>
  );
}
