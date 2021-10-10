import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Nav() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <nav>
      {auth ? (
        <>
          | <Link to="/admin">Admin</Link> |{" "}
          <button className="btn btn-danger" onClick={logout}>
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
        </>
      )}
    </nav>
  );
}

export default Nav;
