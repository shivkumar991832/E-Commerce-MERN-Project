import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import { Routes, Route } from "react-router-dom";


import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import List from "./pages/list";
import Order from "./pages/order";
import Add from "./pages/Add";




export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : "");
   
   
  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])
  


  return (
    <>
    <ToastContainer/>
      {token === "" ? (
        <Login  setToken={setToken} />
      ) : (
        <div>
          <Navbar setToken={setToken}  />
          <div className="flex w-full">
            <Sidebar />
         
          <div className="w-[70%] mx-auto ml-9 my-8 text-gray-600 text-base]">
            <Routes>
              {/* token required for add , list and to see order product */}
              <Route path="/add" element={<Add token={token}/>} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/order" element={<Order token={token} />} />
            </Routes>
          </div>
           </div>
        </div>
      )}
    </>
  );
};

export default App;

