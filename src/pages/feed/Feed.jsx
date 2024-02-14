import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import "./Feed.css";
import Sidebar from "./Sidebar";
import MiddleBar from "./MiddleBar";
import RightBar from "./RightBar";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config"
function Feed() {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [notAddedSide, setNotAddedSide] = useState(true);
  const [sideProfile, setSideProfile] = useState([]);
  const [notAddedPro, setNotAddedPro] = useState(true);
  const [proProfile, setProProfile] = useState([]);

  let myProfession="";
  if (!notAddedSide) {
    const mySideProfileData = sideProfile[0];
    myProfession = mySideProfileData.profession;
  }
  useEffect(() => {
    const q = query(collection(db, "users"), where("myUserId", "==", userInfo.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setNotAddedSide(true)
      } else {
        setNotAddedSide(false)
        const sideProfileArray = [];
        querySnapshot.forEach((doc) => {
          sideProfileArray.push(doc.data());
        });
        setSideProfile(sideProfileArray)
      }
  
    });
    return () => {
      unsubscribe();
    };
  }, []);


  let myPhoto="";
  if (!notAddedPro) {
    const myProProfileData = proProfile[0];
    myPhoto = myProProfileData.proImageUrl;
  }
  useEffect(() => {
    const q = query(collection(db, "profileImages"), where("proUserId", "==", userInfo.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setNotAddedPro(true)
      } else {
        setNotAddedPro(false)
        const proProfileArray = [];
        querySnapshot.forEach((doc) => {
          proProfileArray.push(doc.data());
        });
        setProProfile(proProfileArray)
      }
  
    });
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <div className="feed">
      <div className="inside_feed">
        <Sidebar userInfo={userInfo} myProfession={myProfession} notAddedSide={notAddedSide} notAddedPro={notAddedPro}  myPhoto={myPhoto}/>
        <MiddleBar userInfo={userInfo}  myProfession={myProfession}  notAddedPro={notAddedPro} myPhoto={myPhoto}/>
        <RightBar />
      </div>
    </div>
  );
}

export default Feed;
