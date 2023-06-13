import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
export const Login = () => {
      const navigate = useNavigate();
      const { dispatch } = React.useContext(AuthContext);
      const handleSubmit = (event) => {
        event.preventDefault();
        alert("Logedin Successfully!");
        dispatch({type:"LOGIN",payload:{user:{name:"ohm"}}})
        navigate("/product");
      }
        return (
          <form onSubmit={handleSubmit}>
           <h3>Sign In</h3>
           <div className="mb-3">
             <label>Username</label>
             <input
               type="text"
               className="form-control"
               placeholder="Enter Username"
             />
           </div>
           <div className="mb-3">
             <label>Password</label>
             <input
               type="password"
               className="form-control"
               placeholder="Enter password"
             />
           </div>
           <div className="mb-3">
             <div className="custom-control custom-checkbox">
               <input
                 type="checkbox"
                 className="custom-control-input"
                 id="customCheck1"
               />
               <label className="custom-control-label" htmlFor="customCheck1">
                 Remember me
               </label>
             </div>
           </div>
           <div className="d-grid text-center">
             <input type="submit" value="Submit" className="btn btn-primary" />
           </div>
           <br></br>
           <div class="col-md-12"> <a class="btn btn-lg btn-google btn-block text-uppercase btn-outline btn btn-danger google-plus" href="#">SignIn Using Google</a> </div>
           <p className="forgot-password text-right">
             Forgot <a href="#">password?</a>
           </p>
          </form>
        );
}
export default Login;
