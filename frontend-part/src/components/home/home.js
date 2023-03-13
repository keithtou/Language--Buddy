import "./home.css";
import Footer from "../footer/footer";
import Header from "../header/header";
import Image from 'react-bootstrap/Image'

function Home() {
    return (
        <>
            <Header></Header>
          <main>
            <div className="wrapper" >          
              <div  id="main">
                 < Image className='img-fluid shadow-4' src ="https://transnationalmigrantplatform.net/wp-content/uploads/2021/07/Building-a-New-Narrative-Cover-1-scaled.jpg"/>
             </div>
            </div> 
          </main>
          <Footer></Footer>
        </>  
    )

}

export default Home;
