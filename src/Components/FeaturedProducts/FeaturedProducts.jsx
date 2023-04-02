 import React, { useEffect, useState } from 'react'
import styles from '../FeaturedProducts/FeaturedProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

 export default function FeaturedProducts() {
  const [products, setproducts] = useState([])

  async function getProducts(){
   let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`);
   setproducts(data.data);
   console.log(data.data);
  }

  useEffect(()=>{
   getProducts();
  })
   return <>
   <div className="row">
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
          <button className='btn bg-main text-white w-100'>+ Add</button>
          </Link>
        </div>
      </div>)}
   </div>
   </>
 }
 