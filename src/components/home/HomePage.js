import React from 'react';
import bgImg from "../../assets/img/bergenBlue.jpg";
import walk from "../../assets/img/walk.jpg";
import hike from "../../assets/img/hike.jpg";
import pillow from "../../assets/img/pillow.jpg";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Search from "../Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWalking } from "@fortawesome/free-solid-svg-icons";
import { faHiking } from "@fortawesome/free-solid-svg-icons";

const walking = <FontAwesomeIcon icon={faWalking} />;
const hiking = <FontAwesomeIcon icon={faHiking} />;

function changeBackground(e) {
  var image = e.target;
   var imgOverlay = document.querySelector(".hikeBlock__elem");
   var img = document.querySelector(".hikeBlock__image");
   var p = document.querySelector(".overLayText");
   if(image.src === undefined) {
     return;
   } else {
     image.style.opacity = 0.2;
     image.style.transition = "1s";
     p.style.display = "block";
   }
 }

 function removeBackground(e) {
    var image = e.target;
    var img = document.querySelector(".hikeBlock__image");
    var overLayText = document.querySelector(".overLayText");
    image.style.opacity = 1;
    var p = document.querySelector(".overLayText");
    p.style.display = "none";
  }

  function changeBackground2(e) {
    console.log(e.target);
    var image2 = e.target;
    var p2 = document.querySelector(".overLayText2");
    if(image2.src === undefined) {
      return;
    } else {
      image2.style.opacity = 0.2;
      image2.style.transition = "1s";
      p2.style.display = "block";
    }
  }

   function removeBackground2(e) {
     var image2 = e.target;
     var imgOverlay2 = document.querySelector(".hikeBlock__elem");
     var overLayText2 = document.querySelector(".overLayText2");
     image2.style.opacity = 1;
     var p2 = document.querySelector(".overLayText2");
     p2.style.display = "none";
    }

export default function HomePage() {
  return (
    <>
      <Col container className="block" id="search">
        <img
          className="block__image"
          src={bgImg}
          alt="People walking at the docks in Bergen "
        />
        <div className="block__elem">
          <h2 className="block__header">
            COME EXPERIENCE THE BEST ACCOMMODATIONS BERGEN CITY HAS TO OFFER! TRIPS CUSTOMIZED JUST FOR YOU.{" "}
          </h2>
          <div className="searchContainer">
            <Search />
          </div>
        </div>
        <h3 id="experienceH3">Experience Bergen</h3>
      </Col>
      <Row xs={1} sm={1} md={3} lg={3} xl={3} xxl={3} className="hikeBlock">
        <Col className="hikeBlock__elem" onMouseOver={changeBackground}
        onMouseLeave={removeBackground}>
          <div className="hikeBlock__textBox">{walking}</div>
          <p className="overLayText">Bergen is a beautiful city to walk around in and explore. It has many old and majestetic buildings and ornaments for you to take in. Bergen is known for the docks by the sea, which are brewing with activity much of the year.</p>
          <img
            src={walk}
            className="hikeBlock__image"
            alt="People waking in Bergen city"

          />
        </Col>
        <Col className="hikeBlock__elem" onMouseOver={changeBackground2}
        onMouseLeave={removeBackground2}>
          <div className="hikeBlock__textBox">{hiking}</div>
          <p className="overLayText2">Hiking in the mountains of Bergen is an amazing experience. It has many old and majestetic buildings and ornaments for you to take in. Bergen is known for the docks by the sea, which are brewing with activity much of the year.</p>
          <img
            src={hike}
            className="hikeBlock__image"
            alt="Man hiking in the mountain"
          />
        </Col>
      </Row>
      <Row xs={2} sm={1} lg={2} xl={2} xxl={2} className="hotelBlock">
        <Col xs={12} lg={6} xl={6} xxl={6} className="hotelBlock__elem">
          <img
            className="hotelBlock__image"
            src={pillow}
            alt="A pillow on a hotel bed"
          />
        </Col>
        <Col xs={12} xl={4} xxl={6} className="hotelBlock__elem">
          <h3 className="hotelBlock__heading">Find your accommodation</h3>
          <p className="hotelBlock__para">
            Holidaze har et stort utvalg av herlige overnattingsmuligheter.
            Enten du reiser sammen med hele familien, backpacker med
            vennegjengen eller reiser alene, har vi noe for deg!
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
