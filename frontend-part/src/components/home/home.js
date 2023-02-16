import { useState } from "react";
import "./home.css"

import SignUp from '../signUp/signUp';
import SignIn from "../signIn/signIn";


function Home() {
    const [modalActive, setModalActive] = useState(true);
    const [loginFormActive, setLoginFormActive] = useState(true);

    return (
        <main>
            <div className="wrapper">
                 <h2>Home</h2>
                 <div className="buttons_wrapper">
                    <button className="button create_button" onClick={() => setModalActive(true)}>Create new account</button>
                    <button className="button login_button" onClick={() => setLoginFormActive(true)}>Login</button>
                 </div>
            </div>
            <SignUp active={modalActive} setActive={setModalActive}></SignUp>
            <SignIn loginActive={loginFormActive} setLoginActive={setLoginFormActive}></SignIn>
        </main>
       
    )
}

export default Home;