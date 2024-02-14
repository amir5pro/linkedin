import React, { useState, useRef, useEffect } from "react";
import "./MiddleBar.css";
import { Avatar } from "@mui/material";
import { GoFileMedia } from "react-icons/go";
import { FaCalendarDays } from "react-icons/fa6";
import { RiArticleFill } from "react-icons/ri";
import PostModal from "./modal/PostModal";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import Post from "./Post";
import moment from "moment";

function MiddleBar({
  userInfo,
  myProfession,
  notAddedPro,
  myPhoto,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postValue, setPostValue] = useState(false);
  const [posts, setPost] = useState([]);
  const postRef = useRef(null);
  const sendPost = async (message) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        name: userInfo.displayName,
        personId: userInfo.uid,
        myMidProfession: myProfession,
        myMidPhoto: myPhoto,
        message: message,
        timestamp: serverTimestamp(),
      });

      toast.success(<p>Post successful!</p>);

      setModalOpen(false);
      setLoading(false);
      postRef.current.value = "";
      setPostValue(false);
    } catch (e) {
      toast.error(<p>Post failed. Please try again</p>);
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postArray = [];
      querySnapshot.forEach((doc) => {
        postArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPost(postArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="MiddleBar">
      <div className="start_post">
        <div className="input_container">
          <Avatar className="start_avatar" src={notAddedPro ? "" : myPhoto}/>
          <input
            placeholder="Start a post"
            onClick={() => setModalOpen(true)}
          />
        </div>
        <div className="start_bottom">
          <div className="icons ">
            <GoFileMedia className="icon1" />
            <p>Media</p>
          </div>
          <div className="icons icon2">
            <FaCalendarDays className="icon2" />
            <p>Events</p>
          </div>
          <div className="icons icon3">
            <RiArticleFill className="icon3" />
            <p>Write article</p>
          </div>
        </div>
        <PostModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          sendPost={sendPost}
          setLoading={setLoading}
          loading={loading}
          postRef={postRef}
          postValue={postValue}
          setPostValue={setPostValue}
        />
      </div>
      <div className="post_container">
        {posts.map(
          ({ id, name, message, timestamp, personId, myMidProfession ,myMidPhoto}) => {
            const date =
              timestamp && timestamp.seconds
                ? new Date(timestamp.seconds * 1000)
                : new Date();
            const formattedDate = date
              ? moment(date).fromNow()
              : "Date unknown";

            return (
              <Post
                key={id}
                name={name}
                personId={personId}
                message={message}
                postTime={formattedDate}
                myMidProfession={myMidProfession}
                myMidPhoto={myMidPhoto}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export default MiddleBar;
