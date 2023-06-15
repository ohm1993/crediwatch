import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login.component';
import SignUp from './components/signup.component';
import Product from './components/product.component';
import Wishlists from './components/wishlist.component';
import Orders from './components/orders.component';
import OrderDetail from './components/OrderDetail.component';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  var CONTACTS = [
    {name: 'Asus X552CL-SX019D Laptop',price:20000,description:'Asus is a multinational brand making laptops.',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'},
    {name: 'Asus X552CL-SX019D Laptop',price:20000,description:'Asus is a multinational brand making laptops.',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'},
    {name: 'Asus X552CL-SX019D Laptop',price:20000,description:'Asus is a multinational brand making laptops.',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'},
    {name: 'Asus X552CL-SX019D Laptop',price:20000,description:'Asus is a multinational brand making laptops.',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'},
    {name: 'Asus X552CL-SX019D Laptop',price:20000,description:'Asus is a multinational brand making laptops.',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'}
  ];
  var ORDERS = [
    {ordernumber:'#A915AFLE4FO',orderdate:'Aug 5th, 2017',name: 'Asus X552CL-SX019D Laptop',price:20000,quantity:1,status:'Active',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'},
    {ordernumber:'#A915AFLE4FO',orderdate:'Aug 5th, 2017',name: 'Asus X552CL-SX019D Laptop',price:40000,quantity:2,status:'Cancelled',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'},
    {ordernumber:'#A915AFLE4FO',orderdate:'Aug 5th, 2017',name: 'Asus X552CL-SX019D Laptop',price:20000,quantity:1,status:'Delivered',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'},
    {ordernumber:'#A915AFLE4FO',orderdate:'Aug 5th, 2017',name: 'Asus X552CL-SX019D Laptop',price:40000,quantity:2,status:'Active',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'}
  ];

  var ORDERDETAILS = [
    {ordernumber:'#A915AFLE4FO',orderdate:'Aug 5th, 2017',name: 'Asus X552CL-SX019D Laptop',price:20000,quantity:1,status:'Active',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'},
    {ordernumber:'#A915AFLE4FO',orderdate:'Aug 5th, 2017',name: 'Asus X552CL-SX019D Laptop',price:40000,quantity:2,status:'Cancelled',image:'https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg'}
  ]
  const handleLogout = () => {
    alert("log out clicked");
    dispatch({type: "LOGOUT"});
    window.location.href='/sign-in';
  }

  return (
    <Router>
    <AuthContext.Provider value={{state,dispatch}}>
    <div className="App">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>
            Crediwatch
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {state.isAuthenticated ?
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
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/product" element={<Product contacts={CONTACTS} />} />
            <Route path="/wishlists" element={<Wishlists contacts={CONTACTS} />} />
            <Route path="/orders" element={<Orders contacts={ORDERS} />} />
            <Route path="/orderdetail" element={<OrderDetail contacts={ORDERDETAILS} />} />
          </Routes>
        </div>
      </div>
    </div>
    </AuthContext.Provider>
  </Router>
  );
}

export default App;
