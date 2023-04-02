import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

 export default function Layout({userDate,setuserDate}) {
  let navigate = useNavigate();
  function logout(){
    localStorage.removeItem('userToken');
    setuserDate(null);
    navigate('/login')
    // <Navigate to="/login" state={{ todos: []}} replace={true} />
  }
   return <>
   <Navbar  userDate={userDate} logout={logout}/>
   <div className="container">
   <Outlet></Outlet>
   </div>
   <Footer/>
   </>
 }
 