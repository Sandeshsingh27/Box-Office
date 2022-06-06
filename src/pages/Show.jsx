import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMounted) {
          setShow(result);
          setIsLoading(false);
          //   setError(null);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // eslint-disable-next-line
  console.log('show', show);

  if (isLoading) {
    return <div>Data is being Loaded.</div>;
  }

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return <div>show page</div>;
};

export default Show;
