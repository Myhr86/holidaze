import React, { useState, useEffect } from "react";
import RecievedForms from "./RecievedForms";
import { Link } from "react-router-dom";
import useAxios from "../hotels/useAxios";
import PropTypes from "prop-types";
import Heading from "../layout/Heading";

export default function AdminPage({ children }) {
  const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

const http = useAxios();

useEffect(function () {
  async function getMedia() {
    try {
      const response = await http.get("wp/v2/categories");
      console.log("response", response.data[0]);
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
        <Link to={`/messages`}>Messages</Link>
        <Link to={`/addhotel`}>Add a Hotel</Link>
    </>
  );
}

AdminPage.propTypes = {
  children: PropTypes.node
};
