
 import { Formik, useFormik } from 'formik'
 import * as Yup from 'yup'
 import axios from 'axios';
 import React, { useState } from 'react'
 import { Link, useNavigate } from 'react-router-dom';
 export default function ForgetPassword() {
  const [loading, setloading] = useState(false)
  let navigate = useNavigate();
  async function handlePassword(values){
    setloading(true)
    let {data} = await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,values)
    setloading(false) 
    console.log(data);
    navigate('/verifyCode')
  }

  let validation = Yup.object({
    email:Yup.string().required('Email is Required').email('Email invalid'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
    },
    validationSchema:validation,
    onSubmit:handlePassword
  });

   return <>
   <div className="w-75 mx-auto py-4">
    <h3 className='text-center'>Forget Password</h3>   
  <form onSubmit={formik.handleSubmit}> 
   <label htmlFor="">Email :</label>
   <input onBlur={formik.handleBlur} type="email" name='email' id='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email}/>
   {formik.touched.email && formik.errors.email ?(<div className='alert alert-danger'>{formik.errors.email}</div>) : null}  
   {loading?<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Send</button>}
  
    </form>

   </div>
   </>
 }
 
 