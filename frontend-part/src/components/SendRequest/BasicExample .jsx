import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  const [data,setData] = useState([{"name":"Anna","country":"USA","language":"English-High"}])

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="../../images/Profile-PNG-File.png" />
      <Card.Body>
        {data.map((e) =>{

     return (  <><Card.Title>{e.name}</Card.Title>
     <Card.Title>{e.country}</Card.Title>
     <Card.Title>{e.language}</Card.Title>
     
     <Card.Text> 
            I am kind and loyal person. I like to connect with different people from all countries
          </Card.Text>
          <Button variant="primary">Send Request</Button></>)
        })}
      </Card.Body>
    </Card>
  );
}

export default BasicExample;