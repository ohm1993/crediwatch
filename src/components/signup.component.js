import React, { Component } from "react";
export default class SignUp extends Component {
    render() {
        const handleSignup = (event) => {
          event.preventDefault();
          alert("Registered Successfully!");
          window.location.href='/sign-in';
        }
        return (
                <form onSubmit={handleSignup}>
                  <h3>Sign Up</h3>
                  <div className="mb-3">
                     <label>Username</label>
                     <input type="text" className="form-control" placeholder="Enter Username"/>
                  </div>
                  <div className="mb-3">
                     <label>Email</label>
                     <input type="text" className="form-control" placeholder="Enter Your Email"/>
                  </div>
                  <div className="mb-3">
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Enter password"/>
                  </div>
                  <div className="d-grid text-center">
                       <button type="submit" className="btn btn-primary">Sign Up</button>
                  </div>
                  <br></br>
                  <div class="col-md-12"> <a class="btn btn-lg btn-google btn-block text-uppercase btn-outline btn btn-danger google-plus" href="#">Signup Using Google</a> </div>
                  <p className="forgot-password text-right">Already registered <a href="/sign-in">sign in?</a></p>
                </form>
        );
    }
}
