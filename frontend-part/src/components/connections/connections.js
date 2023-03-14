import "./connections.css";
import { useState } from "react";
import { useEffect } from "react";
import StudentHeader from "../studentHeader/studentHeader";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";


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
    console.log(requests);
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
            console.log(data)
            setRequests(requests.filter(el => el.id != id))  
          },
          (error) => {
            setError(error.toString());
            console.log(error);
          }
        );
    };

    console.log(requests);

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



  
  return (
    <div>
      <div className="wrapper">
        < StudentHeader />
        
        <div className="connections_container">
        <div >
          <h4 className="connections_name">Sent requests</h4>
          <div className="sent_container">
          {requests.filter(el => el.status == "pending" && el.requester_id == current_id).map((el, index) => (
               <Card className="sent_card" id={el.id} key={index}>
                <Card.Body className="sent_body">
                <Card.Title className="sent_title">{el.responder_username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                <Card.Subtitle className="mb-3 text-muted"></Card.Subtitle>
                </Card.Body>
                <Button className="button" type="submit" onClick={() => deleteConnection(el.id)}> Delete</Button>
              </Card>
               ))}
        </div>
        </div>

        <div>
            <h4 className="connections_name">Incoming requests</h4>
            <div className="inbox_container">
             {requests.filter(el => el.status == "pending" && el.responder_id == current_id).map((el, index) => (
                  <Card key={index}  className="inbox_card">
                  <Card.Body className="inbox_body">
                  <Card.Title className="inbox_title">{el.responder_username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-muted"></Card.Subtitle>
                  </Card.Body>
                  <div className="response-container">
                    <Button className="button " type="submit" onClick={() => updateConnection(el.id, 'approved')}> Accept</Button>
                    <Button className="button " type="submit" onClick={() => updateConnection(el.id, 'rejected')}> Reject</Button>
                  </div>
                 
                </Card>



                  ))} 
            </div> 
        </div>

        <div>
             <h4 className="connections_name">Buddies</h4>
             <div className="buddy_container">
                {requests.filter(el => el.status == "approved").map((el) => (
                   (el.responder_id  == current_id) ?  (
                    <Card className="buddy_card" key={Math.random()}>
                      <Card.Body className="buddy_body">
                      <Card.Title className="buddy_title">{el.requester_username}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{el.requester_email}</Card.Subtitle>
                      <Card.Subtitle className="mb-3 text-muted"></Card.Subtitle>
                    </Card.Body>
                  </Card>
                   ) : ( 
                  <Card className="buddy_card" key={Math.random()}>
                    <Card.Body className="buddy_body">
                    <Card.Title className="buddy_title"> {el.responder_username}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{el.responder_email}</Card.Subtitle>
                    <Card.Subtitle className="mb-3 text-muted"></Card.Subtitle>
                    </Card.Body>
                  </Card>
                )  
              ))} 
            </div>
        </div>

        </div>

      </div>
    </div>
  );
}

export default Connections;
