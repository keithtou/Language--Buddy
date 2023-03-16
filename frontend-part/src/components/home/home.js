import "./home.css";
import Footer from "../footer/footer";
import Header from "../header/header";
import Image from 'react-bootstrap/Image';
import myImage from '../../images/main_foto.jpeg';
import myImageAdd from "../../images/world.png"
import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();

    return (
        <>
            <Header></Header>
          <main style={{backgroundColor: 'white'}}>
            <div className="wrapper"> 

              <div  id="main" >
                <div className="welcome_block">
                  <p>Welcome to Language Buddy, the app that connects you with language learners around the world!</p>
                </div> 
                < Image className='img-fluid shadow-4' src ={myImage}/>
              </div>

              <div id="aboutus">
                   <p>
                   Ready to take your language skills to the next level? 
                   <a onClick={() => nav("/register")}> Sign up</a>  for Language Buddy and start making connections today!
                   </p>
              </div>


              <div id="faq">
                < Image className='img-fluid shadow-4' src ={myImageAdd}/>
                <div className="inspiring_container">
                   <div className="first_container">
                    <p >Learn a new language the easy way with Language Buddy. Connect with native speakers and practice your skills anytime, anywhere!</p>  
                    <p></p>
                   </div>
                   <div className="first_container">
                     <p></p>
                     <p>With Language Buddy, you'll never feel alone in your language learning journey. Connect with language buddies and improve your skills together!</p>  
                   </div>        
                </div>      
              </div>

            </div> 
          </main>

          <Footer></Footer>
        </>  
    )

}

export default Home;
