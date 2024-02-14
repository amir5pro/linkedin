import React, { useState, useEffect } from "react";
import "./MeModal.css";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";
import { MdWorkspacePremium } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../../firebase/config";
import { logout } from "../../../redux/userSlice";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

const MeModal = ({ profileModalOpen, setProfileModalOpen,notAddedHead,myHeadPhoto }) => {
  const [notAddedLog, setNotAddedLog] = useState(true);
  const [logoutProfile, setLogoutProfile] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);




  const dispatch = useDispatch();

  let myLogProfession = "";
  if (!notAddedLog) {
    const myLogProfileData = logoutProfile[0];
    myLogProfession = myLogProfileData.profession;
  }
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("myUserId", "==", userInfo.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setNotAddedLog(true);
      } else {
        setNotAddedLog(false);
        const logProfileArray = [];
        querySnapshot.forEach((doc) => {
          logProfileArray.push(doc.data());
        });
        setLogoutProfile(logProfileArray);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const setLogout = () => {
    dispatch(logout());
    signOut(auth);
  };



  return (
    <>
      <Modal
        className="me_modal"
        style={{
          top: 70,
        }}
        open={profileModalOpen}
        onOk={() => setProfileModalOpen(false)}
        onCancel={() => setProfileModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={() => setLogout()}>
            Logout
          </Button>,
        ]}
      >
        <div className="profile_info">
          <div className="profile_info_top">
            <div className="p_top_main">
              <Avatar className="p_top_main_avatar" src={notAddedHead ? "" : myHeadPhoto}/>
              <div className="p_top_main_word">
                <h3>{userInfo.displayName}</h3>
                <p>{notAddedLog ? "" : myLogProfession}</p>
              </div>
            </div>

            <NavLink to={`profile/${userInfo.uid}`} className="pro_button" onClick={()=>setProfileModalOpen(false)}>View Profile</NavLink> 
           
           
           
          </div>
          <div className="profile_info_middle">
            <h3>Account</h3>
            <div className="profile_premium">
              <MdWorkspacePremium className="profile_gold" size={20} />
              <p>Try premium for 0$</p>
            </div>
            <p>Settings & Privacy</p>
            <p>Help</p>
            <p className="pro_lang">Language</p>
          </div>
          <div className="profile_info_bottom">
            <h3>Manage</h3>
            <p>Posts & Activity</p>
            <p className="profile_job">Job Posting Account</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MeModal;
