 import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/CartContext';

 export default function Checkout() {
  const [isLoading, setisLoading] = useState(false)
  let {onlinePayment,cartId} = useContext(cartContext)
  async function handleSubmit(values){
   console.log(values);
   setisLoading(true)
    let response = await onlinePayment(cartId,values);
    if(response?.data?.status === 'success'){
      // console.log(response.data.session.url);
      window.location.href = response.data.session.url;
     
    }
    setisLoading(false);
   console.log(response);
  }
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    onSubmit:handleSubmit
  })
   return <>
  <div className="w-50 py-5 mx-auto">
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="">Details :</label>
      <input type="text" id='details' name='details' className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange}/>

      <label htmlFor="">Phone :</label>
      <input type="tel" id='phone' name='phone' className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange}/>

      <label htmlFor="">City :</label>
      <input type="text" id='city' name='city' className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange}/>

      {isLoading?<button className='btn bg-main text-white w-100' type='button'><i className='fas fa-spinner fa-spin'></i></button>:<button type='submit' className='btn bg-main text-white w-100'>Pay</button>}
    </form>
  </div>
   </>
 }
 