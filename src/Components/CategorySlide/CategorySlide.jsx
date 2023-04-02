 import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";

 export default function CategorySlide() {
  const [categories , setcategories ] = useState(null)
    let parmas = useParams();
    console.log(parmas);
   async function getCategories(){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    setcategories(data.data);
    }
    useEffect(()=>{
      getCategories();
    },[])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  }; 
   return <>
    <Slider {...settings} className='py-3 category-slide'>
    {categories?.map((category)=><div key={category._id}>
      <img className='w-100' height={200} src={category.image} alt="" />
      <h2 className='h6 pt-2'>{category.name}</h2>
      </div>
    )} 
   </Slider>
   </>
 }
 