
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ContactRow = (props) => {
  const navigate = useNavigate();
  const handleWishlist = (id) => {
    let user = JSON.parse(localStorage.getItem("user"));
    axios.post('http://localhost:8000/wishlist/create',{
       name: user.name,
       user_id:user._id,
     }).then((res) => {
       let wishlistResp = res.data;
       if(wishlistResp.status){
          axios.post(`http://localhost:8000/wishlist/${wishlistResp.data._id}/items`,{
            product_id: id
          }).then((resp1) =>{
             console.log("resp1 value is",resp1);
             alert("item added to the wish list successfully");
             navigate("/wishlists");
          }).catch((err) => {
             alert("error");
          });
       }
     }).catch((err) => {
        alert("error");
     });
  }
  const handleOrderDetails = (id) => {
    let user = JSON.parse(localStorage.getItem("user"));
    axios.post('http://localhost:8000/wishlist/create',{
       name: user.name,
       user_id:user._id,
     }).then((res) => {
       let wishlistResp = res.data;
       if(wishlistResp.status){
          axios.post(`http://localhost:8000/wishlist/${wishlistResp.data._id}/items`,{
            product_id: id
          }).then((resp1) =>{
             alert("item added to the wish list successfully");
             navigate("/orderdetail");
          }).catch((err) => {
             alert("error");
          });
       }
     }).catch((err) => {
        alert("error");
     });
  }
  return (
    <tr>
      <td><img src={props.contact.image} width="100" height="100"></img></td>
      <td>{props.contact.name}</td>
      <td>{props.contact.price}</td>
      <td>{props.contact.description}</td>
      <td><input type='number' value='1' id='quantity' name='quantity' min='1' max='5'/></td>
      <td>
        <button type="submit" class="btn btn-danger mr-2" onClick={() => handleWishlist(props.contact._id)}>Save</button>
        <button type="submit" class="btn btn-success ms-1" onClick={() => handleOrderDetails(props.contact._id)}>Buy Now</button>
      </td>
    </tr>
  );
};


class ContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/product')
      .then(response => {
        if(response.data.status){
           this.setState({ products: response.data.data, loading: false });
        }
      })
      .catch(error => {
        alert("error");
      });
  }

  render() {
    var rows = [];
    this.state.products.forEach((contact) => {
      if (contact.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<ContactRow contact={contact}/>);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

export default class  Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <ContactTable
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}
