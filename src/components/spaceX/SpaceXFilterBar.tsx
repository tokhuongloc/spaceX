import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { updateTimeParam } from '../../redux/slices/spaceX/spaceX';
import { useAppDispatch } from '../../hooks/state-dispatch/useAppDispatch';
import { fetchSpaceXList } from '../../redux/slices/spaceX/spaceX';
import { updateLaunchStatusParam } from '../../redux/slices/spaceX/spaceX';

const SpaceXFilterBar = () => {
  const [time, setTime] = useState('all');
  const [launchStatus, setLaunchStatus] = useState('all');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateTimeParam(time));
    dispatch(fetchSpaceXList());
  }, [dispatch, time]);

  useEffect(() => {
    dispatch(updateLaunchStatusParam(launchStatus));
    dispatch(fetchSpaceXList());
  }, [dispatch, launchStatus]);

  return (
    <Container className="mt-2 mt-md-3">
      <Row>
        <Col xs={0} md={3}></Col>
        <Col xs={12} md={6}>
          <Form className="d-flex col-12 col-md-6">
            <Form.Group>
              <Form.Label>Select time</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                as="select"
                value={time}
                custom
              >
                <option value="all">All</option>
                <option value="lastWeek">Last week</option>
                <option value="lastMonth">Last month</option>
                <option value="lastYear">Last year</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Launch Status</Form.Label>
              <Form.Control
                value={launchStatus}
                onChange={(e) => setLaunchStatus(e.target.value)}
                as="select"
                custom
              >
                <option value="all">All</option>
                <option value="success">Success</option>
                <option value="fail">Fail</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={0} md={3}></Col>
      </Row>
    </Container>
  );
};

export default SpaceXFilterBar;
