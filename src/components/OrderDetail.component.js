
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

class ContactRow extends React.Component {
  render() {
    return (
      <tr>
        <td><img src={this.props.contact.product_id.image} width="100" height="100"></img></td>
        <td>{this.props.contact.product_id.name}</td>
        <td>{this.props.contact.product_id.price}</td>
        <td>{1}</td>
        <td><button type="submit" class="btn btn-danger ms-1">Remove</button></td>
      </tr>
    );
  }
}

function myParams(Component) {
    return props => <Component navHook={useNavigate()} />;
}

class ContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderlists: [],
      total_price: 0
    };
    this.place_order = this.place_order.bind(this);
  }
  componentDidMount() {
      let user = JSON.parse(localStorage.getItem("user"));
      axios.get(`http://localhost:8000/wishlist/${user.wishlist._id}`)
        .then(response => {
          console.log("order list response data is",response);
          if(response.data.status){
            let totalprice = 0;
            response.data.data[0].items.forEach((item) => {
              totalprice = totalprice + item.product_id.price
            })
             console.log("order list data value is",response.data.data[0].items,totalprice);
             this.setState({ orderlists: response.data.data[0].items,total_price:totalprice });
          }
        })
        .catch(error => {
          alert("error");
        });
  }

  place_order() {
    let user = JSON.parse(localStorage.getItem("user"));
    axios.post('http://localhost:8000/order/create',{
       user_id:user._id,
       status:'ACTIVE',
       total_price:this.state.total_price
     }).then((res) => {
        if(res.data.status){
            let createOrderResp = res.data.data;
             axios.post(`http://localhost:8000/order/${createOrderResp._id}/items`,{
               product_id: this.state.orderlists[0].product_id._id,
               price:this.state.orderlists[0].product_id.price
             }).then((resp1) =>{
                axios.delete(`http://localhost:8000/wishlist/${user.wishlist._id}`).then((res) => {
                     alert("order created successfully");
                     //window.location.href='/orders'
                 }).catch((err) => {
                    console.log("error while deleing the wishlist and items",err);
                    alert(err.message);
                 });
             }).catch((err) => {
               console.log("error while creating order item is",err);
                alert("error");
             });
        }
     }).catch((err) => {
        console.log("error value while create order is",err)
        alert("error");
     });
  }

  render() {
    var rows = [];
    this.state.orderlists.forEach((contact) => {
      rows.push(<ContactRow contact={contact} />);
    });

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
<td class="text-right"><h5><strong>{this.state.total_price}</strong></h5></td>
</tr>
<tr>
<td>   </td>
<td>   </td>
<td>   </td>
<td><h5>Estimated shipping</h5></td>
<td class="text-right"><h5><strong>0.00</strong></h5></td>
</tr>
<tr>
<td>   </td>
<td>   </td>
<td>   </td>
<td><h3>Total</h3></td>
<td class="text-right"><h3><strong>{this.state.total_price}</strong></h3></td>
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
<button type="button" class="btn btn-success" onClick={this.place_order}>
Place Order <span class="fa fa-play"></span>
</button></td>
</tr>
        </tbody>
      </table>
    );
  }
}

class  OrderDetail extends React.Component {
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

export default myParams(OrderDetail);
