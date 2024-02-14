import React, { useEffect, useState } from "react";
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import "./App.css";
import Home from "./pages/home/Home";
import { NoPage } from "./pages/NoPage/NoPage";
import RootLayout from "./layout/RootLayout";
import Signup from "./pages/signup/Signup";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/feed/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/userSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeedLayout from "./layout/FeedLayout";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NoPage />} />
      <Route path="feed" element={<FeedLayout />} >
        <Route path="main" element={<Feed/>}/>
        <Route path="profile/:userId" element={<Profile/>}/>
      </Route>
    </Route>
  )
);

function App() {
 
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
     setLoading(false)
    
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading_container">
        <Spin size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
    <RouterProvider router={router} />
    <ToastContainer className="toast"/>
    </div>
  
  ) 
}

export default App;