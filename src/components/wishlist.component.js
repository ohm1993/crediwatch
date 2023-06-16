
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ContactRow = (props) => {
  const navigate = useNavigate();
  const handleOrderDetails = () => {
     navigate("/orderdetail");
  }
  const removeItems = (id) => {
     let user = JSON.parse(localStorage.getItem("user"));
     axios.delete(`http://localhost:8000/wishlist/${user.wishlist._id}/items/${id}`).then((res) => {
         alert("item removed successfully");
         navigate("/product");
      }).catch((err) => {
         alert(err.message);
      });
  }

  return (
    <tr>
      <td><img src={props.contact.product_id.image} width="100" height="100"></img></td>
      <td>{props.contact.product_id.name}</td>
      <td>{props.contact.product_id.price}</td>
      <td>{props.contact.product_id.description}</td>
      <td>
        <button type="submit" className="btn btn-danger mr-2" onClick={() => removeItems(props.contact._id)}>Remove</button>
        <button type="submit" className="btn btn-success ms-1" onClick={handleOrderDetails}>Buy Now</button>
      </td>
    </tr>
  );
};


class ContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlists: []
    };
  }
  componentDidMount() {
      let user = JSON.parse(localStorage.getItem("user"));
      axios.get(`http://localhost:8000/wishlist/${user.wishlist._id}`)
        .then(response => {
          if(response.data.status){
             console.log("wish list data value is",response.data.data[0].items);
             this.setState({ wishlists: response.data.data[0].items });
          }
        })
        .catch(error => {
          alert("error");
        });
  }

  render() {
    var rows = [];
    this.state.wishlists.forEach((contact) => {
      // if (contact.name.indexOf(this.props.filterText) === -1) {
      //   return;
      // }
      rows.push(<ContactRow contact={contact} />);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
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

export default class  Wishlists extends React.Component {
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
        <h1>Wish List</h1>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <ContactTable
          contacts={this.props.contacts}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}
