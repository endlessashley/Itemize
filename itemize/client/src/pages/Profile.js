import React from 'react';

import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import {
  QUERY_SINGLE_USER
} from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {

  const { loading, data } = useQuery(
    QUERY_SINGLE_USER

  );
  let user;

  if (data) {
    user = data.user;
    console.log(user)
    console.log(user._id)
  }


  return (

<>

  {user? (
    <>
    <h2>{user.name}'s Lists:</h2>
    <div className="row">
      
      <div className="d-flex align-center justify-center col-sm-12 col-md-3 col-lg-3 profile-card">
      <Link to = {`/novels/${user._id}`}>Novels</Link>

      </div>
      <div className="d-flex align-center justify-center col-sm-12 col-md-3 col-lg-3 profile-card">
      <Link to = {`/nonfiction/${user._id}`}>Nonfiction</Link>

      </div>
      <div className="d-flex align-center justify-center col-sm-12 col-md-3 col-lg-3 profile-card">
      <Link to = {`/currentbooks/${user._id}`}>Current Books</Link>
      <br/>
      <br/>
      </div>
      
    </div>
    </>
  ):null}

 

</>

  );
};

export default Profile;
