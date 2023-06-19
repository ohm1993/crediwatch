import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export const Navigation = (props) => {

  const handleLogout = () => {
    alert("log out clicked");
    props.dispatchVal({type: "LOGOUT"});
    window.location.href='/sign-in';
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          Crediwatch
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            {props.stateValue.isAuthenticated ?
              <>
            <li className="nav-item">
              <Link className="nav-link" to={'/product'}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/wishlists'}>
                Wish List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/orders'}>
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/sign-out'} onClick={handleLogout}>
                Logout
              </Link>
            </li></>
            :
            <>
            <li className="nav-item">
              <Link className="nav-link" to={'/sign-in'}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/sign-up'}>
                Sign up
              </Link>
            </li>
            </>
            }
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
};
