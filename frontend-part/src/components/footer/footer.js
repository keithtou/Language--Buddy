import React from "react";
import { useState } from "react";
import "./footer.css"
import Logo from "../logo/logo";
import logo_languagelab_transparent from '../../images/logo_languagelab_transparent.png';
import logo_occ from '../../images/logo_occ.png';
import logo_Transparent_Migracode from '../../images/logo_Transparent_Migracode.png';
import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer>
          <div className="footer-wrapper">
      <div className="logos">
          <img src={logo_languagelab_transparent} alt="Language lab logo" width="110" height="88"  />
          <div className="logos">
          <img src={logo_occ} alt="logo OCC"  width="130" height="88"/>
          </div>
          <div className="logos">
          <img src={logo_Transparent_Migracode} alt= "logo Migracode" width="130" height="88"/>
          </div>
        
      </div>
    
            <div className="copyright">
            <p> &copy;{new Date().getFullYear()} Language Buddy | All rights reserved</p>
            </div>
                
            </div>
            <div className="language-selector">
        <p>Select Language:</p>
        <select>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>

      </div>

      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </nav>

        </footer>
       
  
    )
}

export default Footer;