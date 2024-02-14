import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import { BsLinkedin } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GrFormSearch } from "react-icons/gr";
import HeaderOptions from "./HeaderOptions";
import { FaHome, FaBriefcase } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import MeModal from "./modal/MeModal";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedPc, setIsClickedPc] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [notAddedHead, setNotAddedProHead] = useState(true);
  const [proProfileHead, setProProfileHead] = useState([]);
  const searchRef = useRef(null);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    function handler(e) {
      if (!searchRef.current.contains(e.target)) {
        setIsClicked(false);
        setIsClickedPc(false);
       
      } else {
        setIsClickedPc(true);
     
      }
    }
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [searchRef]);

  useEffect(() => {
    let handlerSearch = () => {
      if (width > 800) {
        setIsClicked(false);
      }
    };
    handlerSearch();
  }, [width]);

  const handleClick = () => {
    setIsClicked(true);
   
  };


  let myHeadPhoto="";
  if (!notAddedHead) {
    const myHeadProfileData = proProfileHead[0];
    myHeadPhoto = myHeadProfileData.proImageUrl;
  }
  useEffect(() => {
    const q = query(collection(db, "profileImages"), where("proUserId", "==", userInfo.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setNotAddedProHead(true)
      } else {
        setNotAddedProHead(false)
        const headProfileArray = [];
        querySnapshot.forEach((doc) => {
          headProfileArray.push(doc.data());
        });
        setProProfileHead(headProfileArray)
      }
  
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="header">
      <div className={`header_left ${isClicked && "change_width"}`}>
        <BsLinkedin size={35} className="header_logo" />
        <div
          className={`header_search ${
            width <= 800 ? (isClicked ? "yes" : "no") : (isClickedPc && "clicked")
          }`}
          ref={searchRef}
        >
          {width > 800 ? (
            <>
              <GrFormSearch className="search" />
              <input type="text" placeholder="search" />{" "}
            </>
          ) : isClicked ? (
            <>
              <GrFormSearch className="search" />
              <input
                type="text"
                placeholder="search"
                autoFocus={isClicked && true}
              />{" "}
            </>
          ) : (
            <GrFormSearch className="search" onClick={() => handleClick()} />
          )}
        </div>
      </div>
      <div className={`header_right ${isClicked && "right_yes"}`}>
        <HeaderOptions Icon={FaHome} title="Home" shouldNavigate={true} />
        <HeaderOptions Icon={HiUsers} title="My Network" />
        <HeaderOptions Icon={FaBriefcase} title="Jobs" />
        <HeaderOptions Icon={AiFillMessage} title="Messaging" />
        <HeaderOptions Icon={BsFillBellFill} title="Notifications" />
        <HeaderOptions avatar={notAddedHead ? "gtgt" : myHeadPhoto} title="Me" onClick={()=>setProfileModalOpen(true)}/>
      </div>
      <MeModal profileModalOpen={profileModalOpen} setProfileModalOpen={setProfileModalOpen} myHeadPhoto={myHeadPhoto} notAddedHead={notAddedHead} />
    </div>
  );
}

export default Header;
