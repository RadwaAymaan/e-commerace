 import React, { useContext, useEffect, useState } from 'react'
 import styles from '../ProductDetails/ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import $ from 'jquery'
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
  const [productsDetails , setproductsDetails ] = useState(null)
  let parmas = useParams();
  console.log(parmas);
  let{addToCart,setnumOfCartItems} = useContext(cartContext);

  async function addProduct(productId){
   let response = await addToCart(productId);
   if(response?.data?.status === 'success'){
     setnumOfCartItems(response.data.numOfCartItems)
     toast.success(response.data.message,{duration:2000});
     console.log(response.data.message);
   } 
   else{
     toast.error('Error',{duration:2000});
   }
   console.log(response.data);
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  async function getProductsDetails(id){
  // setisLoadding(true)
  let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
  setproductsDetails(data.data);
  // setisLoadding(false)
  $('.loading').fadeOut(2000);
  }
  useEffect(()=>{
   getProductsDetails(parmas.id);
  },[])
   return <>
 
   <div className="row py-3 align-items-center justify-content-center">
   <div className='position-fixed top-0 end-0 start-0 bottom-0 loading bg-main'>
    <i className='fas fa-spinner fa-spin fa-4x text-white'></i>
    </div>
   <>
    <div className="col-md-4">
   <Slider {...settings}>
    {productsDetails?.images.map((img)=><img className='w-100' src={img} alt=""/>
    )} 
   </Slider> 
   </div>
   <div className="col-md-8">
    <h3>{productsDetails?.title}</h3>
    <p className='text-muted p-2'>{productsDetails?.description}</p>
    <div className="d-flex justify-content-between">
          <span className='text-muted'>{productsDetails?.price} EGP</span>
          <span>
          <i className='fas fa-star rating-color'>{productsDetails?.ratingsAverage}</i>
          </span>
          </div>
          <button  onClick={()=>addProduct(parmas.id)}className='btn bg-main text-white w-100'>+ Add</button>
   </div>
   </>
   </div>
   </>
 }
 