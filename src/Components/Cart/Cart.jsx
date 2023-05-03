 import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import styles from '../Cart/Cart.module.css'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";
import $ from 'jquery'

 export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null)
  const [isLoadding, setisLoadding] = useState(false)
  let {getLoggedCart,removeItem,updateProductCount,clearUserCart,setnumOfCartItems,numOfCartItems} = useContext(cartContext)
  async function getCart(){
    // setisLoadding(true);
    let response  = await getLoggedCart();
    console.log(response.data.data);
    if(response?.data?.status === 'success'){
      setcartDetails(response.data.data);
      // setisLoadding(false);
      $('.loading').fadeOut(2000);
    }


  }
  async function deleteItem(productId){
    setisLoadding(true);
    let response  = await removeItem(productId);
    setcartDetails(response.data.data);
    toast.success('Product removed successfully from your cart')
    setisLoadding(false);
    console.log(response);
  }

  async function updateProductQuantity(productId,count){
    setisLoadding(true);
    let response  = await updateProductCount(productId,count);
    setcartDetails(response.data.data);
    toast.success('Product count updated  successfully from your cart')
    if(count === 0){
      deleteItem(productId);
    }
    setisLoadding(false);
    console.log(response);
  }

  async function clearAllCarts(){
    // setisLoadding(true);
    let response  = await clearUserCart();
    if(response.data.message === 'success'){
    setcartDetails(null);
    } 
    if(cartDetails === null){
      setnumOfCartItems(0);
    }

  }

  useEffect(()=>{
    getCart();
 },[])

   return <>
   <Helmet>
    <title>Cart</title>         
     </Helmet>
     <div className='position-fixed top-0 end-0 start-0 bottom-0 loading bg-main'>
    <i className='fas fa-spinner fa-spin fa-4x text-white'></i>
    </div>
     {isLoadding?<div className='align-items-center text-center justify-content-center p-4 my-4'>
    <i className='fas fa-spinner fa-spin fa-2x text-main'></i>
   </div>:null}
   {
   cartDetails !== null?<div className='bg-main-light p-4 my-4'>
  <h3>Cart Shop : </h3>
  <h6 className='text-main'>Total Cart Price : {cartDetails.totalCartPrice} EGP</h6>
  {cartDetails?.products.map((product)=> <div key={product.product._id} className="row align-items-center border-bottom py-1 my-1"> 
  <div className='col-md-1'>
    <img className='w-100' src={product.product.imageCover} alt="image" />
  </div>
  <div className="col-md-11 d-flex justify-content-between">
    <div>
   <h6>{product.product.title}</h6>
   <h6 className='text-main'>price : {product.price} EGP</h6>
   <button onClick={()=>deleteItem(product.product._id)} className='btn p-0 m-0 text-danger'> <i className="fa-regular fa-trash-can text-danger"></i> Remove</button>
  </div>

  <div>
    <button onClick={()=>updateProductQuantity(product.product._id,product.count+1)} className='btn btn-sm border-main fw-bold fs-4 text-main'>+</button>
    <span className='mx-3 text-main'>{product.count}</span>
    <button onClick={()=>updateProductQuantity(product.product._id,product.count-1)} className='btn btn-sm border-danger fw-bold fs-4  text-danger'>-</button>
  </div>

  </div>
  </div>
 )}
 <div className='d-flex justify-content-between mt-2'>
 {isLoadding?<button className='btn bg-main text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>: <button className='btn bg-main'>
   <Link className='text-white' to={'/checkout/'+cartDetails._id}>CheckOut</Link>
  </button>}

  <button onClick={clearAllCarts} className='btn bg-danger text-white'>Clear Cart</button>
  </div>
 </div>:null
 }
  </>
 }
 