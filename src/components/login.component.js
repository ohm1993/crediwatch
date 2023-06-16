import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../App";
export const Login = () => {
      const navigate = useNavigate();
      const { dispatch } = React.useContext(AuthContext);
      const initialState = {email: "",password: ""};
      const [data, setData] = React.useState(initialState);
      const handleInputChange = event => {
          setData({
            ...data,
            [event.target.name]: event.target.value
          });
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        setData({...data});
        axios.post('http://localhost:8000/user/login', {
           email: data.email,
           password: data.password ,
         }).then((res) => {
           console.log("success response is",res);
           alert("Logedin Successfully!");
           dispatch({type:"LOGIN",payload:{user:res.data.data}})
           navigate("/product");
         }).catch((err) => {
            alert("error");
         });
      }
        return (
          <form onSubmit={handleSubmit}>
           <h3>Sign In</h3>
           <div className="mb-3">
             <label>Username</label>
             <input
               type="text"
               className="form-control"
               placeholder="Enter Email"
               name="email"
               id="email"
               onChange={handleInputChange}
             />
           </div>
           <div className="mb-3">
             <label>Password</label>
             <input
               type="password"
               className="form-control"
               placeholder="Enter password"
               name="password"
               id="password"
               onChange={handleInputChange}
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
