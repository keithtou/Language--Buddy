import "./logo.css";
import logo from "../../images/logo_add.png";
import { useNavigate } from "react-router-dom";

function Logo() {
  const nav = useNavigate();
  return (
      <img className="logo_img" src={logo} onClick={() => nav("/")} width="160" height="140" />
  );
}

export default Logo;
