import logo from "./assets/Hermes_logo.png";
import "./Header.css";
function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="hermes" />
        <h1>Hermes</h1>
      </div>
    </header>
  );
}

export default Header;
