import bgImg from "../../assets/img/bergenBlue.jpg";
import walk from "../../assets/img/walk.jpg";
import hike from "../../assets/img/hike.jpg";
import pillow from "../../assets/img/pillow.jpg";
import { Link } from "react-router-dom";
import Enquiry from "../Enquiry";
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
            KOM OG OPPLEV DET FLOTTESTE BERGEN HAR Å BY PÅ! HOS OSS FINNER DU DE
            BESTE OVERNATTINGENE I BERGEN.{" "}
          </h2>
          <div className="searchContainer">
            <Search />
            <Enquiry />
          </div>
        </div>
        <h3 id="experienceH3">Experience Bergen</h3>
      </Col>

      <Row xs={1} sm={1} md={3} lg={3} xl={3} xxl={3} className="hikeBlock">
        <Col className="hikeBlock__elem">
          <div className="hikeBlock__textBox">{walking}</div>
          <img
            src={walk}
            className="hikeBlock__image"
            alt="People waking in Bergen city"
          />
        </Col>
        <Col className="hikeBlock__elem">
          <div className="hikeBlock__textBox">{hiking}</div>
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
