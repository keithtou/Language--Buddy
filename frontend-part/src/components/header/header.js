

import { useState } from "react";
import logo from '../../images/logo.png';
import './header.css';
import SignUp from '../signUp/signUp';
import SignIn from "../signIn/signIn";


function Header() {
    const [modalActive, setModalActive] = useState(true);
    const [loginFormActive, setLoginFormActive] = useState(true);

    return (
        <header>
            <div className="wrapper">
                <div className="header__content">
            <div className="logo">
              <img src={logo} width="110" height="88" />
            </div>
        
            <div className="buttons_wrapper">
                    <button className="button create_button" onClick={() => setModalActive(true)}>Register</button>
                    <button className="button login_button" onClick={() => setLoginFormActive(true)}>Login</button>
                 </div>
            </div>  
             </div>
            <SignUp active={modalActive} setActive={setModalActive}></SignUp>
            <SignIn loginActive={loginFormActive} setLoginActive={setLoginFormActive}></SignIn> 
        </header>
        
    )
}

export default Header;