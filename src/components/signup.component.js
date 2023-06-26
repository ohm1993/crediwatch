import React, { Component } from "react";
import axios from 'axios';
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

 onChange = (e) => this.setState({ [e.target.name]: e.target.value });

 handleSignup = async(event) => {
   event.preventDefault();
   console.log("function called",this.state);
   await axios.post('http://localhost:8000/user/register', {
     name:this.state.name,
     email: this.state.email,
     password: this.state.password
   })
   .then((res) => {
     let resData = res.data;
     if(resData.status){
       alert("Registered Successfully!");
       window.location.href='/sign-in';
     }
     else{
       alert(resData.message)
     }
   }).catch((err) => {
     alert(err.message);
   });
  }

    render() {
        return (
                <form onSubmit={this.handleSignup}>
                  <h3>Sign Up</h3>
                  <div className="mb-3">
                     <label>Username</label>
                     <input type="text" className="form-control" placeholder="Enter Name" name="name" value={this.state.name} onChange={this.onChange} required/>
                  </div>
                  <div className="mb-3">
                     <label>Email</label>
                     <input type="text" className="form-control" placeholder="Enter Your Email" name="email" value={this.state.email} onChange={this.onChange} required/>
                  </div>
                  <div className="mb-3">
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.password} onChange={this.onChange} required/>
                  </div>
                  <div className="d-grid text-center">
                       <button type="submit" className="btn btn-primary">Sign Up</button>
                  </div>
                  <br></br>
                  <p className="forgot-password text-right">Already registered <a href="/sign-in">sign in?</a></p>
                </form>
        );
    }
}
