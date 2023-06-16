
import React, { Component } from "react";
import axios from 'axios';

class ContactRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.contact.order_id}</td>
        <td>{this.props.contact.createdAt}</td>
        <td><img src={this.props.contact.product_id.image} width="50" height="50"></img></td>
        <td>{this.props.contact.product_id.name}</td>
        <td>1</td>
        <td>{this.props.total_price}</td>
        <td>
          <button type="submit" className="btn btn-danger" disabled>{this.props.status}</button>
        </td>
      </tr>
    );
  }
}

class ContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      total_price:'',
      status:''
    };
  }
  componentDidMount() {
      let user = JSON.parse(localStorage.getItem("user"));
      axios.get(`http://localhost:8000/order/${user._id}`)
        .then(response => {
            console.log("order response is",response.data.data[0]);
            if(response.data.status){
               this.setState({ orders: response.data.data[0].orderitems,
                              status:response.data.data[0].status,
                              total_price:response.data.data[0].total_price
                            });
            }
        })
        .catch(error => {
          console.log("while fetching order list error is",error);
          alert("error");
        });
  }

  render() {
    var rows = [];
    this.state.orders.forEach((contact) => {
      rows.push(<ContactRow contact={contact} status={this.state.status} total_price={this.state.total_price}/>);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default class  Orders extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Order List</h1>
        <ContactTable />
      </div>
    );
  }
}
