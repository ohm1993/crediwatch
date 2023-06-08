import React, { Component } from "react";
export default class Login extends Component {
    render() {
        return (
                <form>
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
             <button type="submit" className="btn btn-primary">
               Submit
             </button>
           </div>
           <br></br>
           <div class="col-md-12"> <a class="btn btn-lg btn-google btn-block text-uppercase btn-outline btn btn-danger google-plus" href="#">SignIn Using Google</a> </div>
           <p className="forgot-password text-right">
             Forgot <a href="#">password?</a>
           </p>
          </form>
        );
    }
}
