import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const privData = ({username:"bruker", password:"Wjsnuy99."});

function Nav() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();
  function logout() {
    setAuth(null);
    history.push("/");
  }

  if (auth !== (null || undefined)) {
    console.log(auth);
    //var userType = auth.user_display_name;
    //console.log(userType);
  } else if (auth === (null || undefined)) {
    setAuth(privData)
  }
var userType = "bruker";
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
    </nav>
  );
}

export default Nav;
