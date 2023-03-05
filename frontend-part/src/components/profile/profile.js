

import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import Logo from "../logo/logo";
import DropdownButtons from "../dropdownButtons/dropdownButtons";


function Profile() {
  const nav = useNavigate();

  //encode JWTtoken and get current id user
  let token = localStorage.getItem("jwtToken");
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  let result = JSON.parse(jsonPayload)
  let current_id = result.sub;
  console.log(current_id)

  const [current_user, setCurrent] = useState({});

useEffect( () => {
    fetch(`http://localhost:4000/users/${current_id}`)
     .then(res => res.json())
     .then( data => {
        console.log(data)
        setCurrent(data)}
        );
 }, [current_id]);

    return (
        <div>
            <div className="wrapper">
              <div className="main_header">
                    <Logo />
                    <div className="button_container">
                      <Button className="button people_button" type="submit" onClick={()=> nav("/people")} >People</Button>
                      <DropdownButtons />
                    </div>
              </div> 
            
      
            {/* add all information about current user */}
            

              <Card className="" id={current_user["id"]}>
      <Card.Body className="card_body">
        <Card.Title className="card_title">{current_user["username"]}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{current_user["nationality"]}</Card.Subtitle>
        <Card.Subtitle className="mb-3 text-muted"></Card.Subtitle>
        <Card.Text>{current_user["description"]}</Card.Text>
        <Button className="button send_button" type="submit">Edit</Button>
      </Card.Body>
    </Card>
                
                  
            </div>
        </div>
       
    )
}

export default Profile;