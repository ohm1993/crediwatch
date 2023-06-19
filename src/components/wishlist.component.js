import React, { Component, useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import Table from './table.component';
import axios from 'axios';

const Wishlists = () => {
  const buttons = [
    { label: 'Remove', action: 'removeItems', disable: false},
    { label: 'Buy Now', action: 'handleOrderDetails', disable: false}
  ];
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
     axios.get(`http://localhost:8000/wishlist/${user.wishlist._id}`)
       .then(response => {
         if(response.data.status){
            const resp = response.data.data.items;
            resp.forEach((res) => {
              res.name = res.product_id.name;
              res.image = res.product_id.image;
              res.price = res.product_id.price;
              res.description = res.product_id.description;
            })
            console.log("resp value is",resp);
            setData(resp);
         }
       })
       .catch(error => {
         console.log("wish list fetch error is",error);
         alert("error");
       });
  }, []);

  const columns = ['image', 'name', 'price','description'];

  const handleButtonClick = (action, rowId) => {
    switch (action) {
      case 'removeItems':
           let user = JSON.parse(localStorage.getItem("user"));
           console.log("row id and user wish list id is",user.wishlist._id,rowId);
           axios.delete(`http://localhost:8000/wishlist/${user.wishlist._id}/items/${rowId}`).then((res) => {
               alert("item removed successfully");
               navigate("/product");
            }).catch((err) => {
                console.log("error while removing items is",err);
                alert(err.message);
            });
            break;
      case 'handleOrderDetails':
             navigate("/orderdetail");
             break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Wishlists</h1>
      <Table
        columns={columns}
        buttons={buttons}
        data={data}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default Wishlists;
