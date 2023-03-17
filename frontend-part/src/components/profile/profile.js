import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import "./profile.css"
import DeleteProfileModal from "../deleteProfile/deleteProfile"; 
import StudentHeader from "../studentHeader/studentHeader"
import config from '../../config'


function Profile() {
  const nav = useNavigate();

  const [current_user, setCurrent] = useState({});
  let current_avatar = `https://api.multiavatar.com/${current_user["username"]}.svg`;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


   //encode JWTtoken and get current id user
   let token = localStorage.getItem("jwtToken");
   let base64Url = token.split('.')[1];
   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
   let result = JSON.parse(jsonPayload)
   let current_id = result.sub;

  useEffect( () => {
    (async () => {
      try {
        await  fetch(`${config.baseUrl}/users/${current_id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
          } 
          })
         .then(res => {
          if (!res.ok) {
            nav("/login")
            throw new Error("Something bad with connection");
          }
          return res.json();
        })
         .then((data) => setCurrent(data));
      } catch (err) {
        console.error(err);
      }
    })();
 }, [current_id]);

 let ageW = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age =  today.getFullYear() - birthDate.getFullYear()
  let month =  today.getMonth() - birthDate.getMonth()
  if(month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  } 
  return age
}


    return (
        <div>
            <div className="wrapper">
              < StudentHeader />

              <div className="profile_container">

                <Card className="profile_card" >
                   <Card.Img variant="top" src={current_avatar}  width="160" height="140" />
                   <Card.Body className="profile_body">
                    <Card.Title className="card_title">Fullname :  {current_user["full_name"]}</Card.Title>
                    <Card.Title className="card_title">Username : {current_user["username"]}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Country : {current_user["nationality"]}</Card.Subtitle>
                    <Card.Subtitle className="mb-3 text-muted">Age : {ageW(current_user["date_of_birth"])}</Card.Subtitle>
                    <Card.Subtitle className="mb-3 text-muted">GENDER : {current_user["gender"]}</Card.Subtitle>
                    <Card.Subtitle className="mb-3 text-muted">{current_user["language_name"]} - {current_user["levels"]}</Card.Subtitle>
                    <Card.Text className="description_profile">DESCRIPTION : {current_user["description"]}</Card.Text>
                    <Button className="button edit_button" onClick={()=> nav("/edit_profile")}>Edit profile</Button>
                 </Card.Body>
               </Card>

                  
                <div className="profile_button_container">
                  <Button className="button delete_button" onClick={handleShow}>Delete profile and data</Button>
                </div> 
              </div>
        
              <DeleteProfileModal handleClose={handleClose} show={show} />  
                  
            </div>
        </div>    
    )
}

export default Profile;