import Nav from "./Nav";
import logo from "../../assets/img/logo.png";

export default function Header() {
  return (
    <header>
          <img className="logo" src={logo} alt="Company logo" />
          <Nav />
    </header>
  );
}
