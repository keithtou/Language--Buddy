import "./connections.css";
import { useState } from "react";
import { useEffect } from "react";
import StudentHeader from "../studentHeader/studentHeader";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import config from '../../config'


function Connections() {
  const nav = useNavigate("");

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  //encode JWTtoken and get current id user
  let token = localStorage.getItem("jwtToken");
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  let result = JSON.parse(jsonPayload);
  let current_id = result.sub;

  const deleteConnection =  async (id) => {
      await fetch(`${config.baseUrl}/connections/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
         return res.json();
        })
        .then(
          (data) => {
            setRequests(requests.filter(el => el.id != id))  
          },
          (error) => {
            setError(error.toString());
            console.log(error);
          }
        );
    };

    const updateConnection =  async (id, status) => {
        await fetch(`${config.baseUrl}/connections/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: status
        })
        })
          .then((res) => {
           return res.json();
          })
          .then(
            (data) => {
              requests.find(el => el.id == id).status = status
              nav("/connections")
            },
            (error) => {
              setError(error.toString());
              console.log(error);
            }
          );
      };


  useEffect(() => {
    (async () => {
      await fetch( `${config.baseUrl}/connections`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
         return res.json();
        })
        .then(
          (data) => {
            setRequests(data);
            // console.log(data)
          },
          (error) => {
            setError(error.toString());
            console.log(error);
          }
        );
    })();
  }, []);

  let arrSent = requests.filter(el => el.status == "pending" && el.requester_id == current_id);
  let arrInbox = requests.filter(el => el.status == "pending" && el.responder_id == current_id);
  let arrBuddies = requests.filter(el => el.status == "approved");

  let arrBlackList = requests.filter(el => el.status == "rejected" && el.responder_id == current_id);

  
  return (
    <div>
      <div className="wrapper">
        < StudentHeader />
        
        <div className="connections_container">
        <div className="connection_wrapper">
          <h4 className="connections_name">Buddy requests sent</h4>
          <div className="sent_container">

          {arrSent.length > 0 ? (
            arrSent.map((el, index) => (

              <Card className="sent_card" id={el.id} key={index}>
              <Card.Img variant="top" src={`https://api.multiavatar.com/${el.responder_username}.svg`}  width="160" height="140" />
              <Card.Body className="sent_body">  
                <Card.Title className="card_title">{el.responder_username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{el.responder_nationality}</Card.Subtitle>
                <Card.Subtitle className="mb-3 text-muted"> {el.responder_language} - {el.responder_level}</Card.Subtitle>
                <Button className="button" type="submit" onClick={() => deleteConnection(el.id)}> Delete</Button>
              </Card.Body>
            </Card>

               )))  : (<div>You do not have any Buddy requests sent at the moment.</div> )}

          
        </div>
        </div>

        <div className="connection_wrapper">
            <h4 className="connections_name">Buddy requests received</h4>
            <div className="inbox_container">

            {arrInbox.length > 0 ? (
               arrInbox.map((el, index) => (
                <Card className="inbox_card" key={index}>
                <Card.Img variant="top" src={`https://api.multiavatar.com/${el.requester_username}.svg`}  width="160" height="140" />
                <Card.Body className="inbox_body">  
                  <Card.Title className="card_title">{el.requester_username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{el.requester_nationality}</Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-muted"> {el.requester_language} - {el.requester_level}</Card.Subtitle>
                  <Card.Text className="description_card">{el.requester_description}</Card.Text>
                  
                </Card.Body>
                <div className="response-container">
                  <Button className="button " type="submit" onClick={() => updateConnection(el.id, 'approved')}> Accept</Button>
                  <Button className="button " type="submit" onClick={() => updateConnection(el.id, 'rejected')}> Reject</Button>
                </div>
              </Card>
                ))) : (<div>You do not have any Buddy requests received at the moment.</div> )}

            </div> 
        </div>

        <div className="connection_wrapper">
             <h4 className="connections_name">My buddies</h4>
             <div className="buddy_container">

             {arrBuddies.length > 0 ? (
                arrBuddies.map((el) => (
                  (el.responder_id  == current_id) ?  (
                    <Card className="buddy_card" key={Math.random()}>
                    <Card.Img variant="top" src={`https://api.multiavatar.com/${el.requester_username}.svg`}  width="160" height="140" />
                    <Card.Body className="sent_body">  
                      <Card.Title className="card_title">{el.requester_username}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{el.requester_nationality}</Card.Subtitle>
                      <Card.Subtitle className="mb-3 text-muted"> {el.requester_language} - {el.requester_level}</Card.Subtitle>
                      <Card.Subtitle className="mb-2">{el.requester_email}</Card.Subtitle>
                      <Button className="button" type="submit" onClick={() => deleteConnection(el.id)}> Delete</Button>
                    </Card.Body>
                  </Card>
                  ) : ( 
                    <Card className="buddy_card" key={Math.random()}>
                    <Card.Img variant="top" src={`https://api.multiavatar.com/${el.responder_username}.svg`}  width="160" height="140" />
                    <Card.Body className="sent_body">  
                      <Card.Title className="card_title">{el.responder_username}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{el.responder_nationality}</Card.Subtitle>
                      <Card.Subtitle className="mb-3 text-muted"> {el.responder_language} - {el.responder_level}</Card.Subtitle>
                      <Card.Subtitle className="mb-2">{el.responder_email}</Card.Subtitle>
                      <Button className="button" type="submit" onClick={() => deleteConnection(el.id)}> Delete</Button>
                    </Card.Body>
                  </Card>
               )  
             ))) : (<div>You do not have any buddies at the moment.</div> )}
            </div>
        </div>



        <div className="connection_wrapper">
            <h4 className="connections_name">My Rejects</h4>
            <div className="inbox_container">

            {arrBlackList.length > 0 ? (
               arrBlackList.map((el, index) => (
                <Card className="inbox_card" key={index}>
                <Card.Img variant="top" src={`https://api.multiavatar.com/${el.requester_username}.svg`}  width="160" height="140" />
                <Card.Body className="inbox_body">
                  <Card.Title className="card_title">{el.requester_username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{el.requester_nationality}</Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-muted"> {el.requester_language} - {el.requester_level}</Card.Subtitle>
                  <Card.Text className="description_card">{el.requester_description}</Card.Text>
                  <Button className="button" type="submit" onClick={() => deleteConnection(el.id)}> Delete</Button>
                </Card.Body>
              </Card>
                ))) : (<div>{"\u2764"}</div> )}

            </div>
        </div>

        </div>

      </div>
    </div>
  );
}

export default Connections;
