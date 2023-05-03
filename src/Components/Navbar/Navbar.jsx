 import React, { useContext } from 'react'
 import logo from '../../Components/assests/images/freshcart-logo.svg' 
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
 export default function Navbar({userDate,logout}) {
  let {numOfCartItems} = useContext(cartContext);
   return <>
     <nav className="navbar fixed-top navbar-expand-sm text-uppercase bg-light navbar-light">
  <div className="container">
    <a className="navbar-brand fs-1 d-flex align-items-center" href='#'>
      <img src={logo} alt="" />
       </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userDate !==null?<ul className="navbar-nav me-auto mt-2 mt-lg-0">
      <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link " to="brands">Brands</Link>
        </li> */}
      </ul>:null}
    </div>
    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
       <li className="nav-item d-flex align-items-center">
       <i className="fa-brands fa-facebook mx-2"></i>
       <i className="fa-brands fa-twitter mx-2"></i>
       <i className="fa-brands fa-instagram mx-2"></i>
       <i className="fa-brands fa-tiktok mx-2"></i>
       <i className="fa-brands fa-linkedin mx-2"></i>
       <i className="fa-brands fa-youtube mx-2"></i>
        </li>
        
        {userDate === null?<>
          <li className="nav-item">
          <Link className="nav-link " to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="register">Register</Link>
        </li>
        </>:
        <>
        <li className="nav-item position-relative">
        <Link className="nav-link px-2" to="cart">
        <i className='fas fa-shopping-cart fa-2x'></i>
        <span className='badge bg-main position-absolute top-0 end-0 text-white'>{numOfCartItems}</span>
        </Link>
      </li>
        <li className="nav-item">
          <span onClick={logout} className="nav-link ">Logout</span>
        </li>
        </>}
       
        
      </ul>
  </div>
</nav>
     
   </>
 }
 