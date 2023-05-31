import { Formik, useFormik } from 'formik'
 import axios from 'axios';
 import React, { useState } from 'react'
 import { Link, useNavigate } from 'react-router-dom';

 export default function VerifyCode() {
  const [loading, setloading] = useState(false)
  const [msgError, setmsgError] = useState('')
  let navigate = useNavigate();
  async function ResetCode(values){
    setloading(true)
    let {data} = await  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values).catch((err)=>{
      console.log(err);
      setmsgError(err.response.data.message)
      setloading(false)
    })   
    console.log(data);
    if(data.status === 'Success'){
      navigate('/reset-password')
      setloading(false)
    }
    
  }
  let formik = useFormik({
    initialValues:{
      resetCode:'',
    },
    onSubmit:ResetCode
  });
   return <>
   <div className="w-75 mx-auto py-4">
    <h3 className='text-center'>Verify Code</h3>
   <form onSubmit={formik.handleSubmit}> 
   <label htmlFor="">ResetCode :</label>
   <input onBlur={formik.handleBlur} type="text" name='resetCode' id='resetCode' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.resetCode}/>
   {formik.touched.resetCode && formik.errors.resetCode ?(<div className='alert alert-danger'>{formik.errors.resetCode}</div>) : null}  
   {msgError!==''?<div className='alert alert-danger'>{msgError}</div>:null} 
   {loading?<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Verify Code</button>}
  </form>
  </div>
   </>
 }
 