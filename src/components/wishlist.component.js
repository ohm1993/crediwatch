
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

const ContactRow = (props) => {
  const navigate = useNavigate();
  const handleOrderDetails = () => {
     navigate("/orderdetail");
  }
  const removeItems = () => {
     navigate("/orderdetail");
  }

  return (
    <tr>
      <td><img src={props.contact.image} width="100" height="100"></img></td>
      <td>{props.contact.name}</td>
      <td>{props.contact.price}</td>
      <td>{props.contact.description}</td>
      <td>1</td>
      <td>
        <button type="submit" class="btn btn-danger mr-2" onClick={removeItems}>Remove</button>
        <button type="submit" class="btn btn-success ms-1" onClick={handleOrderDetails}>Buy Now</button>
      </td>
    </tr>
  );
};


class ContactTable extends React.Component {
  render() {
    var rows = [];
    this.props.contacts.forEach((contact) => {
      if (contact.name.indexOf(this.props.filterText) === -1) {
        return;
      }
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
