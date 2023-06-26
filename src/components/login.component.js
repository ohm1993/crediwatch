import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout,useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AuthContext } from "../App";
export const Login = () => {
      const navigate = useNavigate();
      const { dispatch } = React.useContext(AuthContext);
      const initialState = {email: "",password: ""};
      const [data, setData] = React.useState(initialState);
      const [ user, setUser ] = React.useState([]);
      const handleInputChange = event => {
          setData({
            ...data,
            [event.target.name]: event.target.value
          });
      };
      const handleSubmit = (event) => {
        console.log("handle submit called");
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

      const googlelogin = useGoogleLogin({
           onSuccess: (codeResponse) => setUser(codeResponse),
           onError: (error) => console.log('Login Failed:', error)
      });

      useEffect(
          () => {
              if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                }).then((res) => {
                 axios.post('http://localhost:8000/user/register', {
                    name:res.data.name,
                    email: res.data.email,
                    password: res.data.id
                  })
                  .then((resp) => {
                     console.log("resp value is",resp);
                     alert("Logedin Successfully!");
                     dispatch({type:"LOGIN",payload:{user:resp.data.data}})
                     navigate("/product");
                  }).catch((err) => {
                     alert(err.message);
                  });
                }).catch((err) => console.log(err));
              }
          },
          [ user ]
      );

        return (
          <>
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
           {/* *<div class="col-md-12"> <a class="btn btn-lg btn-google btn-block text-uppercase btn-outline btn btn-danger google-plus" href="#">SignIn Using Google</a> </div> */}
           <p className="forgot-password text-right">
             Forgot <a href="#">password?</a>
           </p>
          </form>
           <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
               <button onClick={() => googlelogin()}>Sign in with Google 🚀 </button>
           </div>
           </>
        );
}
export default Login;
