import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../hotels/useAxios";
import PropTypes from "prop-types";
import Heading from "../layout/Heading";
import Enquiries from "./enquiries/Enquiries";

export default function AdminPage({ children }) {
  const [, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  const http = useAxios();

  useEffect(function() {
    async function getMedia() {
      try {
        const response = await http.get("wp/v2/categories");
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
  return (
    <>
      <Heading content="Admin" />
      <Link className="adminLinks" to={`/messages`}>
        Messages
      </Link>
      <a className="adminLinks" href={`https://skjaerseth.net/wpress/wp-admin/post-new.php?post_type=page`}>
        Add a Hotel
      </a>
      <Enquiries />
    </>
  );
}

AdminPage.propTypes = {
  children: PropTypes.node
};
