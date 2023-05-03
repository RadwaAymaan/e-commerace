 import React from 'react'
 
 export default function Footer() {
   return <>
   <footer>
    <h2>Get The FreshCartApp</h2>
    <p className='text-muted'>We will send you a link , open it on your phone to download app</p>
   <form >
    <div className="row">
      <div className="col-md-10">
        <input type="text" placeholder='Email' className='form-control'/>
      </div>
      <div className="col-md-2">
        <button className='btn bg-main'>Share App Link</button>
      </div>
    </div>
   </form>
   </footer>
   </>
 }
 