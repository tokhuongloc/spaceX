import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { updateSearchParam } from '../../redux/slices/spaceX/spaceX';
import { useAppDispatch } from '../../hooks/state-dispatch/useAppDispatch';
import { fetchSpaceXList } from '../../redux/slices/spaceX/spaceX';

const SpaceXSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm === '') {
      alert('please enter a rocket name');
      return;
    }
    dispatch(updateSearchParam(searchTerm));
    dispatch(fetchSpaceXList());
  };

  return (
    <Container>
      <Row>
        <Col xs={0} md={3}></Col>
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="d-flex ">
              <Form.Control
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Enter rocket name"
              />
              <Button variant="primary ml-md-2 mr-0" type="submit">
                Search
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={0} md={3}></Col>
      </Row>
    </Container>
  );
};

export default SpaceXSearchBar;
