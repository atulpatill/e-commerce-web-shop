import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from 'react-icons/fa';

function AdminPage() {
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
      }, []);
      
  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setproducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <Layout loading={loading}>
        <h3>Product List</h3>
        <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} alt="" height="80" width="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash  />
                  <FaEdit />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export default AdminPage