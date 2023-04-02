import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import styles from '../Register/Register.module.css'

 export default function Register() {
  let navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const [msgError, setmsgError] = useState('')
  async function handleRegister(values){
  setloading(true)
  let {data} = await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((err)=>{
    setloading(false) 
  setmsgError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
  })
  if(data.message === 'success'){
    setloading(false)
    navigate('/login')
  }
  console.log(data);
  }
  let validation = Yup.object({
    name:Yup.string().required('Name is Required').min(3 , 'name minLength is 3').max(10,'name maxLength is 10'),
    email:Yup.string().required('Email is Required').email('Email invalid'),
    password:Yup.string().required('password is Required').matches(/^[A-Z][a-z0-9]{5,8}$/, 'password must start with upperCase'),
    rePassword:Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')],'password and re pasword donot matches'),
    phone:Yup.string().required('phone is Required').matches(/^01[0152][0-9]{8}$/,'phone must be egyption'),

  })
  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },
    validationSchema:validation,
    onSubmit:handleRegister
  });
   return <>
   <div className="w-75 mx-auto py-4">
    <h3>Register Now</h3>
    {msgError?<div className='alert alert-danger'>{msgError}</div>:null} 
    <form onSubmit={formik.handleSubmit}>
   <label htmlFor="">Name :</label>
   <input onBlur={formik.handleBlur} type="text" name='name' id='name' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name}/>
   {formik.touched.name && formik.errors.name ?(<div className='alert alert-danger'>{formik.errors.name}</div>) : null}  
  
   <label htmlFor="">Email :</label>
   <input onBlur={formik.handleBlur} type="email" name='email' id='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email}/>
   {formik.touched.email && formik.errors.email ?(<div className='alert alert-danger'>{formik.errors.email}</div>) : null}  

   <label htmlFor="">Password :</label>
   <input onBlur={formik.handleBlur} type="password" name='password' id='password' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password}/>
   {formik.touched.password && formik.errors.password ?(<div className='alert alert-danger'>{formik.errors.password}</div>) : null}  

   <label htmlFor="">RePassword :</label>
   <input onBlur={formik.handleBlur} type="password" name='rePassword' id='rePassword' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword}/>
   {formik.touched.rePassword && formik.errors.rePassword ?(<div className='alert alert-danger'>{formik.errors.rePassword}</div>) : null}  

   <label htmlFor="">Phone :</label>
   <input onBlur={formik.handleBlur} type="tel" name='phone' id='phone' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone}/>
   {formik.touched.phone && formik.errors.phone ?(<div className='alert alert-danger'>{formik.errors.phone}</div>) : null}  
   {loading?<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>
}
    </form>
   </div>
   </>
 }
 