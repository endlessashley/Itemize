import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import { Redirect, useParams } from 'react-router-dom';
import logo from '../../utils/itemize-icon.png'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();

  };
  return (
    <header className="mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-primary" to="/">
          <div className="row align-center">
             <div className="col-sm-12 col-md-3 col-lg-3">
          {/* <img src="./images/itemize-icon.png" alt="itemize logo"></img> */}
          <img src={logo} />
        </div>
        <div className="col-sm-12 col-md-9 col-lg-9">

          <h2 className="m-0" style={{ fontSize: '2rem', width: '100%' }}>Track Your Progress. <br/> Meet Your Goals.
          </h2>
          </div>
        </div>
  
          <br/>
          <br/>
        </Link>
        {/* <p className="m-0 text-dark" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Track your progress. Meet your goals.
        </p> */}
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-dark m-2" to="/me">
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
