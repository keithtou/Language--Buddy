import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./studentCard.css";
import image from "../../images/Profile-PNG-File.png"

function StudentCard({cards}) {
  return (
    <Card className="student_card">
      <Card.Img variant="top" src={image} />
      <Card.Body className="card_body">
        <Card.Title>{cards.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{cards.nationality}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{cards.language} - {cards.level}</Card.Subtitle>
        <Card.Text>{cards.description}</Card.Text>
        <Button className="button send_button" type="submit">Send Request</Button>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;