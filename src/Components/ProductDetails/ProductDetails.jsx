 import React, { useEffect, useState } from 'react'
 import styles from '../ProductDetails/ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";

 export default function ProductDetails() {
  const [productsDetails , setproductsDetails ] = useState(null)
  const [isLoadding, setisLoadding] = useState(false)
  let parmas = useParams();
  console.log(parmas);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  async function getProductsDetails(id){
  setisLoadding(true)
  let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
  setproductsDetails(data.data);
  setisLoadding(false)
  }
  useEffect(()=>{
   getProductsDetails(parmas.id);
  },[])
   return <>
 
   <div className="row py-3 align-items-center justify-content-center">
   {isLoadding?<div className='text-center align-items-center'>
    <i className='fas fa-spinner fa-spin fa-2x text-main'></i>
   </div>:
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
          <button className='btn bg-main text-white w-100'>+ Add</button>
   </div>
   </>
   } 
   </div>
   </>
 }
 