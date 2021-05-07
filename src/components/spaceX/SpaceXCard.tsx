import { SpaceCard } from '../../redux/slices/spaceX/spaceX';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
const SpaceXCard: React.FC<SpaceCard> = (props) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <div className="p-md-2 p-1">
        <Card className="pt-1">
          <Card.Img
            variant="top"
            src={props.links.mission_patch_small}
            alt={props.mission_name}
            className="img-fluid"
          />
          <Card.Body>
            <Card.Title>{props.mission_name}</Card.Title>
            <Card.Text>{props.rocket.rocket_name}</Card.Text>
            <Card.Text>
              Launch:{' '}
              {props.launch_success ? (
                <Badge variant="success">success</Badge>
              ) : (
                <Badge variant="danger">fail</Badge>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default SpaceXCard;
