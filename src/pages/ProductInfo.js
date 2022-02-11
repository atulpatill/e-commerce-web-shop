import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProductInfo() {
  const [product, setproduct] = useState([]);

  const [loading, setLoading] = useState(false) 

  const dispatch = useDispatch()
 
  const params = useParams();
  const { cartItems } = useSelector((state) => state.cartReducer);
  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true)
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      
      setproduct(productTemp.data());
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  const addtocart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };
  return (
    <Layout loading={loading}>
       <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
        {product &&(<div>
       <p> <b>{product.name}</b></p>
       <img src={product.imageURL} alt="" className="product-info-img"/>
       <hr />
       <p>{product.description}</p>
       <div className="d-flex justify-content-end my-3">
         <button onClick={()=>addtocart(product)}>ADD TO CART</button>
       </div>
     </div>) }
        </div>
      </div>
       </div>
    </Layout>
  );
}

export default ProductInfo;
