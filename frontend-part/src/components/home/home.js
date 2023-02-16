import { useState } from "react";
import "./home.css"

import ProfileForm from '../profileForm/profileForm';


function Home() {
    const [modalActive, setModalActive] = useState(true)
    return (
        <main>
            <div className="wrapper">
                 <h2>Home</h2>
                 <div className="buttons_wrapper">
                    <button className="button create_button" onClick={() => setModalActive(true)}>Create new account</button>
                    <button className="button login_button">Login</button>
                 </div>
            </div>
            <ProfileForm active={modalActive} setActive={setModalActive}></ProfileForm>
            
        </main>
       
    )
}

export default Home;