import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../hooks/state-dispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/state-dispatch/useAppSelector';
import { fetchSpaceXList } from '../../redux/slices/spaceX/spaceX';
import { nanoid } from '@reduxjs/toolkit';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Pagination from 'react-bootstrap/Pagination';
import SpaceXCard from './SpaceXCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const SpaceXList: React.FC = () => {
  const { lists, status } = useAppSelector((state) => state.spaceX);
  const [index, setIndex] = useState(0);

  const spaceXPerPage = 8;
  const pages = Math.ceil(lists.length / spaceXPerPage);

  const newLists = Array.from({ length: pages }, (_, index) => {
    const start = index * spaceXPerPage;
    const end = start + spaceXPerPage;
    const itemInPage = lists.slice(start, end);
    return itemInPage;
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSpaceXList());
  }, [dispatch]);

  if (status === 'pending') {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (lists.length > 0 && status === 'success') {
    return (
      <div className="mt-2 mt-md-3">
        <Container>
          <Row>
            {newLists[index].map((item) => (
              <SpaceXCard key={nanoid()} {...item} />
            ))}
          </Row>
        </Container>
        <div className="mt-5 text-center">
          <Pagination className="justify-content-center">
            {newLists.map((_, idx) => (
              <Pagination.Item
                onClick={() => setIndex(idx)}
                key={idx}
                active={idx === index}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    );
  }
  return (
    <div className="w-75 mt-2 mt-md-5 mx-auto">
      <Alert variant="warning">No result founded!</Alert>
    </div>
  );
};

export default SpaceXList;
