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
import { Navigation } from './components/navigation';

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

  const handleLogout = () => {
    alert("log out clicked");
    dispatch({type: "LOGOUT"});
    window.location.href='/sign-in';
  }

  return (
    <Router>
    <AuthContext.Provider value={{state,dispatch}}>
    <div className="App">
      <Navigation stateValue={state} dispatchVal={dispatch}/>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/product" element={<Product />} />
            <Route path="/wishlists" element={<Wishlists  />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orderdetail" element={<OrderDetail />} />
          </Routes>
        </div>
      </div>
    </div>
    </AuthContext.Provider>
  </Router>
  );
}

export default App;
