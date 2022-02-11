import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";

function AdminPage() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [add, setAdd] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: " ",
  });

  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);

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

  const editHandler = (item) => {
    setProduct(item);

    setShow(true);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      //  setLoading(false)
      // getData()
      handleClose();
      toast.success("Product Updated Succesfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Product Update Failed");
      setLoading(false);
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };
  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      //  setLoading(false)
      // getData()
      handleClose();
      toast.success("Product added Succesfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Action Failed");
      setLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      setLoading(false);
      getData();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Action Failed");
      setLoading(false);
    }
  };

  // Get data for orders tab
  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        // const obj = {
        //   id: doc.id,
        //   ...doc.data(),
        // };
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersArray);
      console.log(ordersArray)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Products" title="Products">
      
          <div className="d-flex justify-content-between">
            <h3>Product List</h3>
            <button onClick={addHandler}>ADD PRODUCT</button>
          </div>

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
                        size={20}
                        onClick={() => deleteProduct(item)}
                      />
                      <FaEdit
                        color="blue"
                        size={20}
                        onClick={() => editHandler(item)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add a Product" : "Edit Product"}
              </Modal.Title>
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
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <textarea
                  rows={3}
                  type="text"
                  className="form-control"
                  placeholder="ImageURL"
                  value={product.imageURL}
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />

                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>CLOSE</button>
              {add ? (
                <button onClick={addProduct}>SAVE</button>
              ) : (
                <button onClick={updateProduct}>SAVE</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <h3>Orders</h3>
          {orders.map((order) => {
          return (
        <table className="table mt-3 order">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.cartItems.map((item) => {
              return (
                <tr>
                  <td>
                    <img src={item.imageURL} alt="" height="80" width="80" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
          )
      })}
 
        </Tab>
      </Tabs>
    </Layout>
  );
}

export default AdminPage;
