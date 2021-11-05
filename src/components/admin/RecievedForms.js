import React, { useState, useEffect } from "react";
import useAxios from "../hotels/useAxios";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function RecievedForms() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios((posts));

  useEffect(function() {
    async function getMedia() {
      try {
        const response = await http.get("wp/v2/myforms");
        console.log("response", response);
        setPosts(response.data);
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
    <>
    <h2 id="messagesH2">Messages</h2>
    <Row xs={1} sm={1} xxl={4} className="messages">
      {posts.map(media => {
        console.log({media})
        let para = media.content.rendered;
        let hotelDesc = para.slice(3, -5);

        return (


          <Col className="messages__textDiv" key={media.id}>
            <h4 className="messages__header">{media.title.rendered}</h4>
            <hr className="messages__hr" />
            <p className="messages__text">{hotelDesc}</p>
          </Col>
        );
      })}
    </Row>
    </>
  );
}
