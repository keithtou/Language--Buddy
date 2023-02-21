import "./logo.css"
import logo from "../../images/logo_add.png"

function Logo() {
    return (
        <a  href="/" > 
        <img className="logo_img" src={logo}  width="160" height="140" />
        </a>
      
    )
}

export default Logo;