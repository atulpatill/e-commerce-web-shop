import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";

function OrdersPage() {
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
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
    <Layout loading={loading} >
     <div className="p-2">
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
     </div>
    </Layout>
  );
}

export default OrdersPage;
