import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios'

 export default function ResetPassword() {
  let navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const [msgError, setmsgError] = useState('')

  async function handleLogin(values){
  setloading(true)
  let {data} = await  axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,values).catch((err)=>{
      console.log(err);
      setmsgError(err.response.data.message)
      setloading(false)
    })   

  if(data.token){
    // localStorage.setItem('userToken',data.token);
    setloading(false);
    navigate('/login')
  }
  console.log(data);
  }
  let validation = Yup.object({
    email:Yup.string().required('Email is Required').email('Email invalid'),
    newPassword:Yup.string().required('newPassword is Required').matches(/^[A-Z][a-z0-9]{5,8}$/, 'newPassword must start with upperCase')

  })
  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
    validationSchema:validation,
    onSubmit:handleLogin
  });
   return <>
   <div className="w-75 mx-auto py-4">
    <h3 className='text-center textt-main'>Reset New Password</h3>
    <form onSubmit={formik.handleSubmit}> 
   <label htmlFor="">Email :</label>
   <input onBlur={formik.handleBlur} type="email" name='email' id='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email}/>
   {formik.touched.email && formik.errors.email ?(<div className='alert alert-danger'>{formik.errors.email}</div>) : null}  

   <label htmlFor="">newPassword :</label>
   <input onBlur={formik.handleBlur} type="password" name='newPassword' id='newPassword' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.newPassword}/>
   {formik.touched.newPassword && formik.errors.newPassword ?(<div className='alert alert-danger'>{formik.errors.newPassword}</div>) : null}  
  {msgError!==''? <div className='alert alert-danger'>{msgError}</div>:null}
   {formik.touched.phone && formik.errors.phone ?(<div className='alert alert-danger'>{formik.errors.phone}</div>) : null}  
   {loading?<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Submit</button>}
    </form>
   </div>
   </>
 }