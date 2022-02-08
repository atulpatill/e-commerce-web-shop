import React from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts } from "../firecommerce-products";

function Homepage() {
  async function addData() {
    try {
      await addDoc(collection(fireDB, "users"), {
        name: "krishna",
        age: 125,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    try {
      const users = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      users.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        usersArray.push(obj);
      });
      console.log(usersArray);
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <Layout>
      <h1>Home</h1>

      <button onClick={addData}>Add data to firebase</button>

      <button onClick={getData}>Get data from firebase</button>
     
    </Layout>
  );
}

export default Homepage;
