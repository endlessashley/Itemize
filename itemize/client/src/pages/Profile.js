import React from 'react';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import NovelsList from '../components/NovelsList';
import NovelForm from '../components/NovelForm';

import { Link } from 'react-router-dom';

import {
  QUERY_SINGLE_USER
  // , QUERY_ME
} from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  // const { userId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    QUERY_SINGLE_USER
    // userId ? QUERY_SINGLE_USER : QUERY_ME,
    // {
    //   variables: { userId: userId },
    // }
  );
  let user;

  if (data) {
    user = data.user;
    console.log(user)
  }

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  // const user = data?.me || data?.user || {};


  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
  //   return <Redirect to="/me" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.name) {
  //   return (
  //     <h4>
  //       You need to be logged in to see your profile page. Use the navigation
  //       links above to sign up or log in!
  //     </h4>
  //   );
  // }

  return (

    //   {user ? (
    //       <h2 className="card-header">
    //         {user.name}'s Lists:
    //       </h2>
    //       {user.novels?.length > 0 && (
    //     <NovelsList novels={user.novels}/>
    //     <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
    //       <NovelForm {user._id} />
    //     </div>
    //   )}
    // )}

<div className="container">
  <div className="row">
    <div className="card">
      <Link to = {`novels/${user._id}`}>
        <p>Novels</p>
      </Link>
    </div>
  </div>
</div>


  );
};

export default Profile;
