import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import styles from '../Login/Login.module.css'

 export default function Login({saveUseData}) {
  let navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const [msgError, setmsgError] = useState('')

  async function handleLogin(values){
  setloading(true)
  let {data} = await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((err)=>{
    setloading(false) 
  setmsgError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
  })
  if(data.message === 'success'){
    localStorage.setItem('userToken',data.token);
    saveUseData();
    setloading(false);
    navigate('/')
  }
  console.log(data);
  }
  let validation = Yup.object({
    email:Yup.string().required('Email is Required').email('Email invalid'),
    password:Yup.string().required('password is Required').matches(/^[A-Z][a-z0-9]{5,8}$/, 'password must start with upperCase')

  })
  let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:validation,
    onSubmit:handleLogin
  });
   return <>
   <div className="w-75 mx-auto py-4">
    <h3 className='text-center'>Login Now</h3>
    {msgError?<div className='alert alert-danger'>{msgError}</div>:null} 

    <form onSubmit={formik.handleSubmit}> 
   <label htmlFor="">Email :</label>
   <input onBlur={formik.handleBlur} type="email" name='email' id='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email}/>
   {formik.touched.email && formik.errors.email ?(<div className='alert alert-danger'>{formik.errors.email}</div>) : null}  

   <label htmlFor="">Password :</label>
   <input onBlur={formik.handleBlur} type="password" name='password' id='password' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password}/>
   {formik.touched.password && formik.errors.password ?(<div className='alert alert-danger'>{formik.errors.password}</div>) : null}  

   {formik.touched.phone && formik.errors.phone ?(<div className='alert alert-danger'>{formik.errors.phone}</div>) : null}  
   {loading?<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>
}
    </form>
   </div>
   </>
 }