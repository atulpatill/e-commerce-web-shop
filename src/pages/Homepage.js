import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts } from "../firecommerce-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Homepage() {
  const {cartItems} = useSelector(state => state.cartReducer)

 const navigate = useNavigate()
  const [products , setproducts] = useState([])
  const dispatch = useDispatch()

  useEffect(()=>{
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
  },[cartItems])

  const addtocart =(product) =>{
           dispatch({
             type: "ADD_TO_CART",
             payload : product
           })
  }

  useEffect(()=>{
    getData()
  },[])

  async function getData() {
    try {
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
     
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
      });
     setproducts(productsArray)
    } catch (error) {
      console.log(error);
    }
  }
   
  
  return (
    <Layout>
     
    <div className="container">
      <div className="row">
        {products.map(product=>{
          return <div className="col-md-4" key={product.id}>

            <div className="m-2 p-1 product position-relative">
            <div className="product-content">
            <p>{product.name}</p>
              <div className="text-center">
              <img src={product.imageURL} alt ="" className="product-img" />
              </div>
            </div>
            <div className="product-actions">
              <h2>{product.price} Rs/-</h2>
              <div className="d-flex">
                <button className="mx-2" onClick={()=>addtocart(product)}>ADD TO CART</button>
                <button onClick={()=>navigate(`productinfo/${product.id}`)}>VIEW</button>
                </div>
            </div>
            </div>
          </div>
        })}
      </div>

    </div>

      
    </Layout>
  );
}

export default Homepage;
