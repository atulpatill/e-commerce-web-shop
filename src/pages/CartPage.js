import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { collection, addDoc} from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";


function CartPage() {
  const [totalAmount, setTotalAmout] = useState();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false) 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState()
  const [address, setAddress] = useState()
  const [phoneNumber, setPhoneNumber] = useState() 
  const [ pincode, setPincode] = useState()

  const dispatch = useDispatch();

  const placeOrder = async () =>{
    const addressInfo = {
      name,
      address,
      phoneNumber,
      pincode
    }
    console.log(addressInfo)

    const orderInfo = {
      cartItems,
      addressInfo,
      email : JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid : JSON.parse(localStorage.getItem("currentUser")).user.uid
    }

    try {
      setLoading(true)
      const result = await addDoc(collection(fireDB, "orders"), orderInfo)
      setLoading(false)
      toast.success('Order Placed Succesfully!!!')
      handleClose()
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('Order Failed')
    }
  }

  

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = Number(temp) + Number(cartItems.price);
    });
    setTotalAmout(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: product,
    });
  };
  return (
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} alt="" height="80" width="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Total Amount = {(totalAmount)}Rs/-</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea rows={3}
              type="text"
              className="form-control"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Contact Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            
           
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>CLOSE</button>
          <button onClick={placeOrder}>ORDER</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
