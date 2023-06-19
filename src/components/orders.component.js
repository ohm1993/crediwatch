import React, { Component, useEffect, useState  } from "react";
import Table from './table.component';
import axios from 'axios';

const Orders = () => {
  const buttons = [
    { label: 'active', action: 'view' }
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:8000/order/${user._id}`)
      .then(response => {
          console.log("order response is",response.data.data);
          if(response.data.status){
             setData(response.data.data)
          }
      })
      .catch(error => {
        console.log("while fetching order list error is",error);
        alert("error");
      });
  }, []);

  const columns = ['Order Number', 'Order Date', 'Image','Name','Quantity','Total','Status'];

  return (
    <div>
      <h2>Table Example</h2>
      <Table
        columns={columns}
        buttons={buttons}
        data={data}
      />
    </div>
  );
};

export default Orders;
