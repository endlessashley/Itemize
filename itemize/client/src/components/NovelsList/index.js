

import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

function NovelsList() {
  const { data } = useQuery(QUERY_ME);
  let user;
 

  if (data) {
    user = data.user;
    console.log(user)
}

  return (
    <>
      <div className="container my-1">

        {user ? (
          <>
            <h2>
              {user.name}'s Completed Bookshelf
            </h2>
            {user.novels.map((novel) => (
              <div key={novel._id} className="my-2">
                <div className="row">
                  <div className="col-sm-4"></div>
                    <div className="card">
                      <p>{novel.name}
                        < br />
                        {novel.author}</p>
                    <div className="rank">
                      <span>{novel.rank} </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default NovelsList;