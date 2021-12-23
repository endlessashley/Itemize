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


<div className="container">
  {user? (
    <>
    <h2>{user.name}'s Lists:</h2>
    <div className="row">
      
      <div className="col-sm-12 col-md-3 col-lg-3 profile-card">
      <Link to = {`/novels/${user._id}`}>All Novels</Link>
      <br/>
      <Link to = {'/novelprogress'}>Novel Progress</Link>
      </div>
      <div className="col-sm-12 col-md-3 col-lg-3 profile-card">
      <Link to = {`/nonfiction`}>All Nonfiction</Link>
      <br/>
      <Link to = {'/nonfictionprogress'}>Nonfiction Progress</Link>
      </div>
      
    </div>
    </>
  ):null}

 
</div>


  );
};

export default Profile;
