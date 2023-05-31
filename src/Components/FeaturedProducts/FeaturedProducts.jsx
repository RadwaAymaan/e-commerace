 import React, { useContext, useEffect, useState } from 'react'
import styles from '../FeaturedProducts/FeaturedProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast'
import {Helmet} from "react-helmet";
import $ from 'jquery'
 export default function FeaturedProducts() {
  const [products, setproducts] = useState([])
 let{addToCart,setnumOfCartItems} = useContext(cartContext);

 async function addProduct(productId){
  let response = await addToCart(productId);
  if(response?.data?.status === "success"){
    setnumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message,{duration:2000});
  } 
  else{
    toast.error('Error',{duration:2000});
  }
  console.log(response);
 }
  async function getProducts(){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
   setproducts(data.data);
  //  console.log(data.data);
  $('.loading').fadeOut(2000);
  }

  useEffect(()=>{
   getProducts();
  })
   return <>
    <Helmet>
    <title>Featured Products</title>         
     </Helmet>
   <div className="row">
    <div className='position-fixed top-0 end-0 start-0 bottom-0 loading bg-main'>
    <i className='fas fa-spinner fa-spin fa-4x text-white'></i>
    </div>
   <>
    {products.map((product)=>
      <div key={product._id} className="col-md-2">
        <div className="product px-2 py-3 cursor-pointer">
          <Link to={`/productDetails/${product._id}`}>
           <img className='w-100' src={product?.imageCover} alt=""/>
          <span className='text-main font-sm fw-bold'>{product.category.name}</span>
          <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
          <div className="d-flex justify-content-between">
          <span className='text-muted'>{product.price} EGP</span>
          <span>
          <i className='fas fa-star rating-color'>{product.ratingsAverage}</i>
          </span>
          </div>
          </Link>
          <button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100'>+ Add</button>
        </div>
      </div>
      )}</>
   
   </div>
   </>
 }
 