import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./studentCard.css";
import image from "../../images/Profile-PNG-File.png";

function StudentCard({ card }) {
  return (
    <Card className="student_card">
      <Card.Img variant="top" src={image} />
      <Card.Body className="card_body">
        <Card.Title>{card.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {card.country}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {card.language} - {card.level}
        </Card.Subtitle>
        <Card.Text>
          I am kind and loyal person. I like to connect with different people
          from all countries
        </Card.Text>
        <Button className="button send_button" type="submit">
          Send Request
        </Button>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;
