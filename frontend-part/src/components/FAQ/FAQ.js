import React from "react";
import "./FAQ.css";
import Header from "../header/header";
import Footer from "../footer/footer";

function FAQ () {
    return (
        <div>
            <Header></Header>
        <div>
    
        <div className="wrapper">
            <div className="faq">

            <p> 
                <b>Who are we?</b>  <br></br> <br></br>
                We are a registered non-profit organisation active in both Spain and Greece, working towards the inclusion of refugees and migrants through educational and cultural activities.<br></br>
                We work mainly with volunteers to offer language classes, technical workshops, sports activities, cultural events, and women and children’s support to the wide variety of communities we work with. <br>
                </br>At the same time, we work on an international level to create awareness about the situation of refugees while working with many European partners to increase our social impact.<br></br><br></br>
                <b>How to register?</b> <br></br><br></br> 
                <a href="/register"><em>Register </em></a> here and start learning!
            
            </p>
               
          </div>
            </div>
              

        </div>
            <Footer></Footer>
        </div>
            
    )
    
    }

    export default FAQ;

