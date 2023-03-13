
import logo from '../../images/logo.png';
import './header.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';

function Header() {
    const nav = useNavigate();

    return (
        <header>
            <div className="wrapper">
                <div className="header__content">
                    <div className="logo">
                       <img src={logo} width="110" height="88" onClick={() => nav("/")} />
                    </div>
                    <div className="buttons_wrapper"> 
                    <Button className="button create_button" type="submit" onClick={() => nav("/register", {replace: true})}>Register</Button>
                    <Button  className="button login_button" type="submit" onClick={() => nav("/login")}>Login</Button>
                    </div>
                </div>  
            </div>   
        </header>   
    )
}

export default Header;