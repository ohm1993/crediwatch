import React, { Component, useEffect, useState  } from "react";
import Table from './table.component';
import axios from 'axios';
import Modal from 'react-modal';

const Orders = () => {
  const buttons = [
    { label: 'view', action: 'view',disable: false }
  ];
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleButtonClick = (action, rowId, row) => {
    console.log("values are",action, rowId, row);
     setSelectedRow(row.orderitems);
     setShowModal(true);
  }
  const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width:'80%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '1px 2px #888888',
        },
  };
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
               res.quantity = 1
             })
             setData(resp)
          }
      })
      .catch(error => {
        console.log("while fetching order list error is",error);
        alert("error");
      });
  }, []);

  const columns = ['_id', 'createdAt','quantity','total_price','status'];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Orders</h1>
      <Table
        columns={columns}
        buttons={buttons}
        data={data}
        onButtonClick={handleButtonClick}
      />
      <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={customStyles} contentLabel="Modal">
      <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ marginRight: 'auto' }}>Order Items</h1>
            <button onClick={handleCloseModal}>Close</button>
      </div>
          <table className='table'>
               <thead>
                   <tr>
                     <th>Image</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Quantity</th>
                   </tr>
               </thead>
               <tbody>

                     {selectedRow && selectedRow.map((row) => (
                         <tr>
                           <td><img src={row.product_id.image} width="50" height="50"></img></td>
                           <td>{row.product_id.name}</td>
                           <td>{row.product_id.price}</td>
                           <td>1</td>
                         </tr>
                     ))}

               </tbody>
            </table>

      </Modal>
    </div>
  );
};

export default Orders;
