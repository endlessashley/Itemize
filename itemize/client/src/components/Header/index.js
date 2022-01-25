import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import { Redirect, useParams } from 'react-router-dom';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();

  };
  return (
    <header className="mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-primary" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            Just Pete Things
          </h1>
          <br/>
          <br/>
        </Link>
        {/* <p className="m-0 text-dark" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Track your progress. Meet your goals.
        </p> */}
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Profile
              </Link>
              <Link to = "/">
              <button className="btn btn-lg btn-primary m-2" onClick={logout}>Log Out
              </button>
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
