
import React, { Component } from "react";

class ContactRow extends React.Component {
  render() {
    return (
      <tr>
        <td><img src={this.props.contact.image} width="100" height="100"></img></td>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.price}</td>
        <td>{1}</td>
        <td><button type="submit" class="btn btn-danger ms-1">Remove</button></td>
      </tr>
    );
  }
}

class ContactTable extends React.Component {
  render() {
    var rows = [];
    this.props.contacts.forEach((contact) => {
      if (contact.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<ContactRow contact={contact} />);
    });
    const place_order = () => {
      alert("Order Placed Successfully!");
      window.location.href='/orders'
    }
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {rows}
<tr>
<td>   </td>
<td>   </td>
<td>   </td>
<td><h5>Subtotal</h5></td>
<td class="text-right"><h5><strong>$999.99</strong></h5></td>
</tr>
<tr>
<td>   </td>
<td>   </td>
<td>   </td>
<td><h5>Estimated shipping</h5></td>
<td class="text-right"><h5><strong>$9.999.99</strong></h5></td>
</tr>
<tr>
<td>   </td>
<td>   </td>
<td>   </td>
<td><h3>Total</h3></td>
<td class="text-right"><h3><strong>$9.999.99</strong></h3></td>
</tr>
<tr>
<td>   </td>
<td>   </td>
<td>   </td>
<td>
<button type="button" class="btn btn-default">
<span class="fa fa-shopping-cart"></span> Continue Shopping
</button></td>
<td>
<button type="button" class="btn btn-success" onClick={place_order}>
Place Order <span class="fa fa-play"></span>
</button></td>
</tr>
        </tbody>
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

export default class  OrderDetail extends React.Component {
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
        <h1>Order Detail</h1>
        <ContactTable
          contacts={this.props.contacts}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}
