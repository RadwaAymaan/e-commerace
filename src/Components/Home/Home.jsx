 import React, { useState } from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlide from '../CategorySlide/CategorySlide'
 export default function Home() {
//   const [isLoadding, setisLoadding] = useState(false)
//   {isLoadding?<div className='text-center align-items-center'>
//   <i className='fas fa-spinner fa-spin fa-2x text-main'></i>
//  </div>:<>
//  <CategorySlide/>
// <FeaturedProducts/>
//   </> }
return<>
<CategorySlide/>
<FeaturedProducts/>
</>
 }
 