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
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';


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
  function route(props){
    if(localStorage.getItem('userToken') == null){
      return <Navigate to="/login" />
    }
    else{
      return props.childern;
      // console.log(props.childern);
    }
  }

  let routers  = createBrowserRouter([
    {path:'',element:<Layout userDate={userDate} setuserDate = {setuserDate}/> ,children:[
      {index:true,element:<Home route = {route}/>},
      {path:'login',element:<Login saveUseData={saveUseData}/>},
      {path:'mainSlide',element:<MainSlide route = {route}/>},
      {path:'products',element: <Products route = {route}/>},
      {path:'productDetails/:id',element: <ProductDetails route = {route}/>},
      {path:'register',element:<Register/>},
      {path:'cart',element:<Cart route = {route}/>},
      {path:'categories',element:<Categories route = {route}/>},
      {path:'*',element:<NotFound/>},
    ]}
  ])
  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}

export default App;
