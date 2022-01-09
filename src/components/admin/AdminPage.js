import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../helpers/useAxios";
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
  const [auth, setAuth] = useContext(AuthContext);

  if (auth == (null || undefined) || auth.user_nicename === "bruker") {
    return <p id="notLoggedIn">Not logged in</p>;
  } else if (auth.user_nicename === "myhr86") {
    return (
      <>
        <Heading content="Admin" />
        {auth ? (
          <>
            <Link className="adminLinks" to={`/messages`}>
              Messages
            </Link>
            <a
              className="adminLinks"
              href={`https://skjaerseth.net/wpress/wp-admin/post-new.php?post_type=page`}
            >
              Add a Hotel
            </a>
          </>
        ) : (
          <p id="notLoggedIn">Not logged in</p>
        )}

        <Enquiries />
      </>
    );
  }
}

AdminPage.propTypes = {
  children: PropTypes.node
};
