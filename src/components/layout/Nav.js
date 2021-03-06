import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Nav() {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();
  function logout() {
    setAuth(null);
    history.push("/");
  }
  if (auth) {
    var userType = auth.user_display_name;
  }

  return (
    <nav>
      {userType === "myhr86" && (
        <>
          | <Link to="/admin">Admin</Link> |{" "}
          <button className="btn btn-danger" onClick={logout}>
            Log out
          </button>
        </>
      )}{" "}
      {userType === "bruker" && (
        <>
          <div id="desktopNav">
            <Link to="/">Home</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
          </div>
          <DropdownButton id="dropdown-basic-button" title="Menu">
            <Dropdown.Item>
              <Link to="/">Home</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/hotels">Hotels</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/contact">Contact</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/login">Login</Link>
            </Dropdown.Item>
          </DropdownButton>
        </>
      )}{" "}
      {(userType === null || userType === undefined) && (
        <>
          <div id="desktopNav">
            <Link to="/">Home</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
          </div>
          <DropdownButton id="dropdown-basic-button" title="Menu">
            <Dropdown.Item>
              <Link to="/">Home</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/hotels">Hotels</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/contact">Contact</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/login">Login</Link>
            </Dropdown.Item>
          </DropdownButton>
        </>
      )}
    </nav>
  );
}

export default Nav;
