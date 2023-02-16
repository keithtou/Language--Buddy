import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import "./signUp.css"
import {country } from "../../data/country";
import {languageList } from "../../data/languagesList"
import {level} from "../../data/level"

function signUp({active, setActive}) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
         <h3>Create your profile</h3>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
          
      <Row className="mb-2">
        <Form.Group as={Col} controlId="validationCustom01">
          <Form.Label>First and last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First and last name"
            defaultValue=""
          />
          <Form.Control.Feedback type="invalid">please, fill first and last name</Form.Control.Feedback>
          <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
        </Form.Group>

         <Form.Group as={Col} controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
            <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

     
       
      <Row className="mb-2">
        <Form.Group as={Col} controlId="validationCustom03">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
          <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Row>

      <Row className="mb-2">
        <Form.Group as={Col} controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>


      <Row className="mb-2">
        <Form.Group as={Col} controlId="validationCustom05">
        <Form.Label>Nationality</Form.Label>
        <Form.Control required as="select" type="select" name="nationality">
          <option value="">-- select one --</option>
  
          {country.map((element) => {
            return (
              <option value={element.en_short_name} key={element.alpha_2_code}>
              {element.en_short_name}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
            Please choose your nationality.
          </Form.Control.Feedback>
          <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-2">
        <Form.Group as={Col} controlId="validationCustom06">
        <Form.Label>Language you can speak</Form.Label>
        <Form.Control required as="select" type="select" name="language">
          <option value="">-- select one --</option>
  
          {languageList.map((element) => {
            return (
              <option value={element.name} key={element.name}>
              {element.name}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
            Please choose your language.
          </Form.Control.Feedback>
          <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
        </Form.Group>
    
        <Form.Group as={Col} controlId="validationCustom07">
        <Form.Label>Language Level</Form.Label>
        <Form.Control required as="select" type="select" name="level">
          <option value="">-- select one --</option>
  
          {level.map((element) => {
            return (
              <option value={element} key={element}>
              {element}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
            Please choose your language level.
          </Form.Control.Feedback>
          <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustom08">
          <Form.Label>BIO</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Your bio" />
        </Form.Group>
      </Row>
      
      <Button type="submit">Signup</Button>
    </Form>
    </div>
    </div>
  );
}

export default signUp;