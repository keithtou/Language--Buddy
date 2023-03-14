import React from "react";
import "./footer.css"
import logo_languagelab_transparent from '../../images/logo_languagelab_transparent.png';
import logo_occ from '../../images/logo_occ.png';
import logo_Transparent_Migracode from '../../images/logo_Transparent_Migracode.png';
import { useNavigate } from "react-router-dom";

function Footer() {
    const nav = useNavigate();

    return (
        <footer>
          <div className="wrapper">

            <div className="footer-wrapper">

              <div className="language-selector">
                <p>Select Language:</p>
                  <select>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
              </div>
             
              <nav>
                <ul>
                  <li><a onClick={()=> nav("/aboutus")}>About Us</a></li>
                  <li><a href="mailto:languages@openculturalcenter.org" target="_blank">Contact Us</a></li>
                  <li><a href="https://www.google.com/maps/place/Open+Cultural+Center+Barcelona/@41.3860019,2.1823493,15z/data=!4m6!3m5!1s0x12a4a2fdd0e3846f:0x5b7de3c819c66eb0!8m2!3d41.3860059!4d2.1823578!16s%2Fg%2F11f3m91v5t" target="_blank">Carrer del Rec 27, 08003 Barcelona</a></li>
                  <li><a onClick={()=> nav("/faq")}>FAQ</a></li>
                </ul>
              </nav>

             <div className="logos">
                <ul>
                  <li><a href="https://openculturalcenter.org/language-lab/" target="_blank"> <img  className="lab" src={logo_languagelab_transparent} alt="Language lab logo" width="100%" height="60"  /></a></li>
                  <li><a href="https://openculturalcenter.org/" target="_blank"> <img  className="occ" src={logo_occ} alt="logo OCC"  width="100%" height="60"/></a></li>
                  <li><a href="https://migracode.openculturalcenter.org/" target="_blank"><img  className="migracode" src={logo_Transparent_Migracode} alt= "logo Migracode" width="100%" height="60"/></a></li>
                </ul>
             </div>
      
            </div>
            
            <div className="copyright">
               <p> &copy;{new Date().getFullYear()} <strong>Language Buddy</strong> | All rights reserved</p>
            </div>
          
          </div>
      </footer>
    )
}

export default Footer;