import logo from "../../assets/img/logo.png";
import "./Logo.css";

export default function Logo() {
  return (
    <>
      <img
        src={logo}
        alt="Clean wave"
        className="logo"
      />
    </>
  );
}
