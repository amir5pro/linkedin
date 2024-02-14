import React from 'react'
import {Outlet} from "react-router-dom"
import Header from "../pages/feed/Header"
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
function FeedLayout() {
    const userInfo = useSelector((state) => state.userInfo.userInfo);
    if (!userInfo) {
        return <Navigate to="/" />;
      }
  return (
    <div>
     <Header />
         <Outlet/>
    </div>
  )
}

export default FeedLayout