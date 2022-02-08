import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";

function ProductInfo() {
  const [product, setproduct] = useState([]);
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );

      setproduct(productTemp);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <h1>ProductInfo</h1>
    </Layout>
  );
}

export default ProductInfo;
