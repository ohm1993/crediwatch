import React, { Component, useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import Table from './table.component';
import axios from 'axios';

const Product = () => {
  const buttons = [
    { label: 'Save', action: 'handleWishlist', disable: false},
    { label: 'Buy Now', action: 'handleOrderDetails', disable: false}
  ];
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    axios.get('http://localhost:8000/product')
      .then(response => {
        if(response.data.status){
          console.log("response data is",response.data.data);
           setData(response.data.data)
        }
      })
      .catch(error => {
        console.log("error  while fetching products is",error)
        alert("error");
      });
  }, []);

  const columns = ['image', 'name', 'price','description','quantity'];

  const handleButtonClick = (action, rowId) => {
    switch (action) {
      case 'handleWishlist':
             var user = JSON.parse(localStorage.getItem("user"));
             axios.post('http://localhost:8000/wishlist/create',{
                name: user.name,
                user_id:user._id,
              }).then((res) => {
                let wishlistResp = res.data;
                if(wishlistResp.status){
                   axios.post(`http://localhost:8000/wishlist/${wishlistResp.data._id}/items`,{
                     product_id: rowId
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
              break;
      case 'handleOrderDetails':
      var user = JSON.parse(localStorage.getItem("user"));
        axios.post('http://localhost:8000/wishlist/create',{
           name: user.name,
           user_id:user._id,
         }).then((res) => {
           let wishlistResp = res.data;
           if(wishlistResp.status){
              axios.post(`http://localhost:8000/wishlist/${wishlistResp.data._id}/items`,{
                product_id: rowId
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
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <Table
        columns={columns}
        buttons={buttons}
        data={data}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default Product;
