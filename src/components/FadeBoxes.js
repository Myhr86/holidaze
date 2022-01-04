import { useEffect } from "react";
import walk from "../assets/img/walk.jpg";
import hike from "../assets/img/hike.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWalking } from "@fortawesome/free-solid-svg-icons";
import { faHiking } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const walking = <FontAwesomeIcon icon={faWalking} />;
const hiking = <FontAwesomeIcon icon={faHiking} />;

export default function FadeBoxes() {

useEffect(function() {
  const boxes = document.querySelectorAll(".hikeBlock__elem");

  boxes.forEach((box) => {
    const text = box.querySelector(".overLayText");
    const image = box.querySelector(".hikeBlock__image");

    box.addEventListener("mouseover", () => {
      text.style.display = "block";
      image.style.opacity = 0.2;
      image.style.transition = "1s";
    });

    box.addEventListener("mouseleave", () => {
      image.style.opacity = 1;
      text.style.display = "none";
    });
  });
}, []);

return (
  <Row xs={1} sm={1} md={3} lg={3} xl={3} xxl={3} className="hikeBlock">
    <Col
      className="hikeBlock__elem"

    >
      <div className="hikeBlock__textBox">{walking}</div>
      <p className="overLayText">
        Bergen is a beautiful city to walk around in and explore. It has
        many old and majestetic buildings and ornaments for you to take in.
        Bergen is known for the docks by the sea, which are brewing with
        activity much of the year.
      </p>
      <img
        src={walk}
        className="hikeBlock__image"
        alt="People waking in Bergen city"
      />
    </Col>
    <Col
      className="hikeBlock__elem"

    >
      <div className="hikeBlock__textBox">{hiking}</div>
      <p className="overLayText">
        Hiking in the mountains of Bergen is an amazing experience. It has
        many old and majestetic buildings and ornaments for you to take in.
        Bergen is known for the docks by the sea, which are brewing with
        activity much of the year.
      </p>
      <img
        src={hike}
        className="hikeBlock__image"
        alt="Man hiking in the mountain"
      />
    </Col>
  </Row>
)
}
