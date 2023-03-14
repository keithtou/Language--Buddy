import React from "react";
import "./aboutus.css";
import Header from "../header/header";
import Footer from "../footer/footer";

function Aboutus () {
    return (
        <div>
            <Header></Header>
            <div className="wrapper"> 
                 <div className="aboutus">
                    <p>
                         To Practice a language with a native speaker,
                         improve your language skills
                          with one-on-one conversations, or 
                          help someone else with the language they are learning.
                          You can <a href="/register"><em>register</em></a> as a Language Buddy.
                    </p>
                 </div>
           
            </div>
            <Footer></Footer>
        </div>
            
    )
    }

    export default Aboutus;