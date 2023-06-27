import React, { Component, useEffect, useState  } from "react";
import { useNavigate, Link } from "react-router-dom";
import Table from './table.component';
import axios from 'axios';
import { AuthContext } from "../App";

const Product = () => {
  const { dispatch } = React.useContext(AuthContext);
  const buttons = [
    { label: 'Save', action: 'handleWishlist', disable: false},
    { label: 'Buy Now', action: 'handleOrderDetails', disable: false}
  ];
  const [data, setData] = useState([]);
  const [pager,setPager] = useState({});
  const [pagination,setPagination] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    console.log("page data is",page);
    let user = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:8000/product?page=${page}`)
      .then(response => {
        if(response.data.status){
           console.log("products data is",response.data);
           setData(response.data.data)
           setPager(response.data.pager)
        }
      })
      .catch(error => {
        console.log("error  while fetching products is",error)
        alert("error");
      });
  }, [pagination]);

  const columns = ['image', 'name', 'price','description','quantity'];

  const handleCheck = () =>{
    setPagination(!pagination);
  }

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
                      axios.get(`http://localhost:8000/user/${user._id}`).then((res) => {
                         dispatch({type:"LOGIN",payload:{user:res.data.data}})
                         alert("item added to the wish list successfully");
                         navigate("/wishlists");
                       }).catch((err) => {
                          alert("error");
                       });
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
      <div className="card-footer pb-0 pt-3">
              {pager.pages && pager.pages.length &&
                  <ul className="pagination">
                      <li onClick={handleCheck} className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                          <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                      </li>
                      <li onClick={handleCheck} className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                          <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Previous</Link>
                      </li>
                      {pager.pages.map(page =>
                          <li onClick={handleCheck} key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                              <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                          </li>
                      )}
                      <li onClick={handleCheck} className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                          <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Next</Link>
                      </li>
                      <li onClick={handleCheck} className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                          <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">Last</Link>
                      </li>
                  </ul>
              }
      </div>

    </div>
  );
};

export default Product;
