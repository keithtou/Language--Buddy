import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./signIn.css"

function SignIn({loginActive, setLoginActive}) {
  return (
    <div className={loginActive ? "signin__wrapper active" : "signin__wrapper"} onClick={() => setLoginActive(false)}>
      <div  className={loginActive ? "signin__content active" : "signin__content"} onClick={(e) => e.stopPropagation()}>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
  );
}

export default SignIn;