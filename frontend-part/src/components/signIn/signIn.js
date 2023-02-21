import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

import "./signIn.css"
import Logo from '../logo/logo';

function SignIn() {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

function handleEmailInput(event) {
  setEmail(event.target.value)
}

function handlePasswordInput(event) {
  setPassword(event.target.value)
}


  return (
    <div className="wrapper">
      <div className="signin__wrapper" >
        <Logo />
        <div  className="signin__content" >
          <h3>Login to your account</h3>
          <Form>
           <Form.Group className="mb-3" controlId="formBasicEmail">
           <Form.Control type="email" placeholder="Enter email" />
           </Form.Group>

           <Form.Group className="mb-3" controlId="formBasicPassword">
           <Form.Control type="password" placeholder="Password"  />
           </Form.Group>

           <Button variant="primary" type="submit" className="button signin_login_button">Login</Button>
          </Form>
        </div>
    </div>
  </div>
    
  );
}

export default SignIn;