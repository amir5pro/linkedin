import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Avatar } from "@mui/material";
import { MdOutlineModeEditOutline } from "react-icons/md";
import AboutModal from "./modal/AboutModal";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import ProPicModal from "./modal/ProPicModal";
import uploadpic from "../../assets/uploadpic.png"
function Profile() {
  const [open, setOpen] = useState(false);
  let { userId } = useParams();
  const [notAdded, setNotAdded] = useState(true);
  const [myProfile, setMyProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPic, setOpenPic] = useState(false);
  const [notAddedAbout, setNotAddedAbout] = useState(true);
  const [proProfileAbout, setProProfileAbout] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  
  let name = "";
  let email = "";
  let profession = "";
  let country = "";
  let college = "";
  let city = "";
  let company = "";
  let industry = "";
  let skill = "";
  let website = "";
  let aboutMe = "";
  if (!notAdded) {
    const myProfileData = myProfile[0];
    name = myProfileData.name;
    // const myUserId = myProfileData.myUserId;
    email = myProfileData.email;
    profession = myProfileData.profession;
    country = myProfileData.country;
    college = myProfileData.college;
    city = myProfileData.city;
    company = myProfileData.company;
    industry = myProfileData.industry;
    skill = myProfileData.skill;
    website = myProfileData.website;
    aboutMe = myProfileData.aboutMe;
  
  }
  useEffect(() => {
    const q = query(collection(db, "users"), where("myUserId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setNotAdded(true);
      } else {
        setNotAdded(false);
        const myProfileArray = [];
        querySnapshot.forEach((doc) => {
          myProfileArray.push(doc.data());
        });
        setMyProfile(myProfileArray);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [userId]);


const handleProfilePic=()=>{
  if( userInfo.uid === userId){
    setOpenPic(true)
  }
}

let myAboutPhoto="";
if (!notAddedAbout) {
  const myProAboutProfileData = proProfileAbout[0];
  myAboutPhoto = myProAboutProfileData.proImageUrl;
}

useEffect(() => {
  const q = query(collection(db, "profileImages"), where("proUserId", "==", userId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.empty) {
      setNotAddedAbout(true)
    } else {
      setNotAddedAbout(false)
      const proAboutProfileArray = [];
      querySnapshot.forEach((doc) => {
        proAboutProfileArray.push(doc.data());
      });
      setProProfileAbout(proAboutProfileArray)
    }
    setLoading(false);
  });

  return () => {
    unsubscribe();
  };
}, [userId]);


  if (loading) {
    return (
      <div className="loading_container">
        <Spin size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>

    <div className="about">
      <div className="inside_about">
        <div className="inside_about_top">
          <div className="img_about"></div>
          <div className="avaEdit">
            {" "}
            <Avatar className="avatar_about" onClick={()=>handleProfilePic()} src={notAddedAbout ? (userInfo.uid === userId ? uploadpic : "")  : myAboutPhoto} />
            <ProPicModal openPic={openPic} setOpenPic={setOpenPic} />
            <MdOutlineModeEditOutline
              size={35}
              className={`edit_about ${
                userInfo.uid !== userId && "EAbout_none"
              } `}
              onClick={() => setOpen(true)}
            />
            <AboutModal open={open} setOpen={setOpen} />
          </div>
        </div>
        {notAdded ? (
          <div className="not_added">
            <h1>Profile info not added</h1>
          </div>
        ) : (
          <div className="inside_about_bottom">
            <div className="inside_about_b">
              <div className="inside_about_bnp">
                <h3>{name}</h3>
                <p className="in_pro">{profession}</p>
                <p className="word_break inside_address">
                  {city},{country}
                </p>
              </div>
              <div className="eCollege">
                <p className="word_break abColor">{college}</p>
                <p className="email_inside">Email: {email}</p>
              </div>
            </div>
            <div className="inside_about_bInner ">
              <div className="sw">
                <p className="word_break abColor">Skills: {skill}</p>
                <p className="word_break webWeb">{website}</p>
              </div>
              <div className="ic">
                <p className="word_break abColor">Industry: {industry}</p>
                <p className="word_break abColor">Company: {company}</p>
              </div>
            </div>
            <div className="inside_about_bOut">
              <p className="word_break abColor">{aboutMe}</p>
            </div>
          </div>
        )}
      </div>
    </div>
      <div className="footer_profile">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
