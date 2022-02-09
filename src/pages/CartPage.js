import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';

function CartPage() {
  const [totalAmount, setTotalAmout] = useState()
  const {cartItems} = useSelector(state => state.cartReducer)
       const dispatch = useDispatch()

       useEffect(()=>{
             let temp = 0;
             cartItems.forEach(cartItems=>{
               temp = temp + cartItems.price
             })
             setTotalAmout(temp)
       },[cartItems])

       useEffect(()=>{
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    },[cartItems])

  const deleteFromCart =(product) =>{
    dispatch({
      type: "DELETE_FROM_CART",
      payload : product
    })
  }
  return (
  <Layout>
   
       <table className='table mt-3' >
         <thead>
           <tr>
             <th>Image</th>
             <th>Name</th>
             <th>Price</th>
             <th>Action</th>
           </tr>

         </thead>
         <tbody>
           {cartItems.map(item=>{
            return( <tr>
               <td><img src={item.imageURL}  alt='' height='80' width='80' /></td>
               <td>{item.name}</td>
               <td>{item.price}</td>
               <td><FaTrash onClick={()=>deleteFromCart(item)}/></td>
             </tr>
          ) })}
         </tbody>
       </table>

       <div className='d-flex justify-content-end'>
         <h1 className='total-amount'>Total Amount => {totalAmount}Rs/-</h1>

       </div>
       <div className='d-flex justify-content-end mt-3'>
        <button>PLACE ORDER</button>

       </div>
  </Layout>
  )
}

export default CartPage;
