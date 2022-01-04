import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(function() {
    async function getMedia() {
      try {
        const response = await http.get("wp/v2/enquiries");
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
      <h3 className="messagesH3">Enquiries</h3>
      <Row xs={1} sm={1} xxl={4} className="messages">
        {posts.map(media => {
          let para = media.content.rendered;
          let paraSplice = para.split("|");

          for (let i = 0; i < paraSplice.length; i++) {
            var firstPara = paraSplice[0].replace("<p>", "");
            var lastName = paraSplice[1].replace("<p>", "");
            var email = paraSplice[2].replace("</p>", "");
            var date = paraSplice[3].replace("</p>", "");
            var night = paraSplice[4].replace("</p>", "");
            var lastPara = paraSplice[5].replace("</p>", "");

            return (
              <Col className="messages__textDiv" key={media.id}>
                <h4 className="messages__header">{media.title.rendered}</h4>
                <hr className="messages__hr" />
                <p className="messages__text">
                  <span className="labelSpan">Name:</span> {firstPara}
                </p>
                <p className="messages__text">
                  <span className="labelSpan">Last Name:</span> {lastName}
                </p>
                <p className="messages__text">
                  <span className="labelSpan">Email:</span> {email}
                </p>
                <p className="messages__text">
                  <span className="labelSpan">Date:</span> {date}
                </p>
                <p className="messages__text">
                  <span className="labelSpan">Number of nights:</span> {night}
                </p>
                <p className="messages__text">
                  <span className="labelSpan">Message:</span> {lastPara}
                </p>
              </Col>
            );
          }
        })}
      </Row>
    </>
  );
}
