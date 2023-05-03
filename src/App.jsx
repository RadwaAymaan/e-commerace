import logo from './logo.svg';
import './App.css';
import { createBrowserRouter ,Navigate,RouterProvider, useNavigate} from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import MainSlide from './Components/MainSlide/MainSlide'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import Login from './Components/Login/Login';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import Checkout from './Components/Checkout/Checkout';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { CounterContextProvider } from './Context/CounterContext';
import { CartContextProvider } from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Offline, Online } from "react-detect-offline";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

function App() {
  useEffect(()=>{
   if(localStorage.getItem('userToken') !==null){
    saveUseData();
   }
  },[])
  const [userDate, setuserDate] = useState(null)
  function saveUseData(){
   let encodedToken =  localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken)
    setuserDate(decodedToken);
  }

  let routers  = createBrowserRouter([
    {path:'',element:<Layout userDate={userDate} setuserDate = {setuserDate}/> ,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path:'login',element:<Login saveUseData={saveUseData}/>},
      {path:'mainSlide',element:<ProtectedRoute><MainSlide/></ProtectedRoute> },
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute> },
      {path:'productDetails/:id',element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
      {path:'register',element:<Register/>},
      {path:'forget-password',element:<ForgetPassword/>},
      {path:'reset-password',element:<ResetPassword/>},
      {path:'verifyCode',element:<VerifyCode/>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute> },
      {path:'checkout/:cartId',element:<ProtectedRoute><Checkout/></ProtectedRoute> },
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute> },
      {path:'*',element:<Login/>},
    ]}
  ])

  return <> <CartContextProvider>
  {/* <Online>Only shown when you're online</Online> */}
  <Offline><div className='network'><i className="fa-solid fa-wifi text-danger"></i> Only shown offline (surprise!)</div> </Offline>
  <Toaster/>
  <RouterProvider router={routers}></RouterProvider>
  </CartContextProvider>
  </>
}

export default App;
