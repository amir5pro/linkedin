import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { LiaCommentDots } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { BsGlobeAmericas } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import { NavLink } from "react-router-dom";

function Post({ name,  postTime, message,personId,myMidProfession,myMidPhoto }) {
  return (
    <div className="post">
      <div className="post_top">
        <div className="post_info_container">
          <Avatar className="post_avatar" src={myMidPhoto ? myMidPhoto : ""} />
          <div className="post_info">
          <NavLink to={`../profile/${personId}`} className="post_name">{name}</NavLink> 
            <p>{myMidProfession ? myMidProfession : "" }</p>
            <div className="post_time">
              <p>{postTime}</p>
              <p>&bull;</p>
              <BsGlobeAmericas size={10}/>
            </div>
          </div>
        </div>
        <div className="post_follow">
          <FaPlus size={15} />
          <p>Follow</p>
        </div>
      </div>
      <div className="post_middle">
        <p>{message}</p>
      </div>
      <div className="post_bottom">
        <div className="post_icons ">
          <BiLike size={20} />
          <p>Like</p>
        </div>
        <div className="post_icons">
          <LiaCommentDots size={20} />
          <p>Comment</p>
        </div>
        <div className="post_icons">
          <BiRepost size={20} />
          <p>Repost</p>
        </div>
        <div className="post_icons">
          <LuSendHorizonal size={20} />
          <p>Send</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
