import Nav from "./Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export default function Header() {
  return (
    <header>
      <Link to={`/`}>
        <img className="logo" src={logo} alt="Company logo" />
      </Link>
      <Nav />
    </header>
  );
}
