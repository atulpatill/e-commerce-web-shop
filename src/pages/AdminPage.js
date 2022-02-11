import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal } from "react-bootstrap";


function AdminPage() {
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState({
      name : "",
      price: 0,
      imageURL : "",
      category : " ",

    })

    const [show, setShow] = useState(false);
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

  const editHandler = (item) =>{
    setProduct(item)

    setShow(true)
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
                  <FaTrash 
                  color="red"
                  size={20} />
                  <FaEdit
                  color="blue"
                  size={20} 
                  onClick={()=> editHandler(item)}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
            />
            <textarea rows={3}
              type="text"
              className="form-control"
              placeholder="ImageURL"
              value={product.imageURL}
              onChange={(e) => setProduct({...product, imageURL: e.target.value})}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
            />

            
           <hr/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button >CLOSE</button>
          <button >SAVE</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default AdminPage