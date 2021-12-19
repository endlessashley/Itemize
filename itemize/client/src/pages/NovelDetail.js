import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { useStoreContext } from '../utils/GlobalState';
import {

  UPDATE_NOVELS,
} from '../utils/actions';
import { QUERY_NOVELS } from '../utils/queries';


function NovelDetail() {
  const [state, dispatch] = useState();
  const { id } = useParams();

  const [currentNovel, setCurrentNovel] = useState();

  const { loading, data } = useQuery(QUERY_NOVELS);

  const { novels, 
  } = state;

  useEffect(() => {
    if (novels.length) {
      setCurrentNovel(novels.find((novel) => novel._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_NOVELS,
        novels: data.novels,
      });
    }
  }, [novels, data, loading, dispatch, id]);


  return (
    <>
      {currentNovel 
       ? (
        <div className="container my-1">
          <Link to="/">← Back to Home</Link>
          <div className="category-card">

          <h2>{currentNovel.name}</h2>

          <p>{currentNovel.author}</p>

          <p>
          <div className="points">
            {currentNovel.rank}

          </div>

          </p>
          </div>

        </div>
      ) : null}
      
    </>
  );
}

export default NovelDetail;