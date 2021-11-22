import React, { useState, useEffect } from "react";
import useAxios from "./useAxios";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function HotelList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios(posts);

  var listHotels = [];

  useEffect(function() {
    async function getMedia() {
      try {
        const response = await http.get("wp/v2/pages");
        response.data.map(val => {
          if (val.slug.includes("_")) {
            listHotels.push(val);
            setPosts(listHotels);
          }
        });
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{}</div>;

  return (
    <Row xs={1} sm={1} xxl={4} className="hotels">
      {posts.map(media => {
        function detectURLs(message) {
          var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
          return message.match(urlRegex);
        }
        let para = media.excerpt.rendered;
        let hotelDesc = para.slice(3, -5);
        let imgUrl = detectURLs(media.content.rendered);
        if (imgUrl !== null) {
          var newUrl = imgUrl[0];
          var trimUrl = newUrl.slice(0, -1);
        }

        return (
          <Col className="hotels__textDiv" key={media.id}>
            <Link to={`/details/${media.id}`}>
              <img
                alt="Hotel Building from outside"
                className="hotels__image"
                src={trimUrl}
              />
            </Link>
            <h4 className="hotels__header">{media.title.rendered}</h4>
            <hr className="hotels__hr" />
            <p className="hotels__text">{hotelDesc}</p>
          </Col>
        );
      })}
    </Row>
  );
}
