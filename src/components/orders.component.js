import React, { Component, useEffect, useState  } from "react";
import Table from './table.component';
import axios from 'axios';

const Orders = () => {
  const buttons = [
    { label: 'view', action: 'view',disable: true }
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:8000/order/${user._id}`)
      .then(response => {
          console.log("orders response is",response.data.data);
          if(response.data.status){
             const resp = response.data.data;
             resp.forEach((res) => {
               res.name = res.orderitems[0].product_id.name;
               res.image = res.orderitems[0].product_id.image;
               res.quantity = 1.
             })
             setData(resp)
          }
      })
      .catch(error => {
        console.log("while fetching order list error is",error);
        alert("error");
      });
  }, []);

  const columns = ['_id', 'createdAt', 'image','name','quantity','total_price','status'];

  return (
    <div>
      <h1>Orders</h1>
      <Table
        columns={columns}
        buttons={buttons}
        data={data}
      />
    </div>
  );
};

export default Orders;
