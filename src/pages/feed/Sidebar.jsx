import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "./Sidebar.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdWorkspacePremium } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";



function Sidebar({userInfo,myProfession,notAddedSide,notAddedPro,myPhoto}) {
  const [showMore,setShowMore]=useState(false)
  
  return (
    <div className="sidebar" >
  
      <div className="sidebar_top">
        <div className="sidebar_top1">
          <div className="img"></div>
          <Avatar className="avatar" src={notAddedPro ? "" : myPhoto} />
        </div>
        <div className={`sidebar_top2 ${!showMore && 'show_top'}`}>
          <NavLink to={`../profile/${userInfo.uid}`} className="side_my_name">{userInfo.displayName}</NavLink>
          <p>{notAddedSide ? " " : myProfession}</p>
        </div>
        <div className={`sidebar_top3 ${!showMore && 'show_more'}`}>
          <div className="inner_top3">
            <h4>connections</h4>
            <p>connect with alumni</p>  
          </div>
          <AiOutlineUserAdd />
        </div>
        <div className={`sidebar_top4 ${!showMore && 'show_more'}`}>
          <p>strengthen your profit with an Ai writing assistant</p>
          <div className="premium">
            <MdWorkspacePremium className="gold" />
            <p>Try premium for 0$</p>
          </div>
        </div>
        <div className={`sidebar_top5 ${!showMore && 'show_more'}`}>
          <FaBookmark className="bookmark" />
          <h4>My items</h4>
        </div>
      </div>
      <div className={`sidebar_bottom ${!showMore && 'show_more'}`}>
        <div className="sidebar_bottom1">
          <p className="recent">Groups</p>
          <div className="events">
            <p className="recent">Events</p>
            <FaPlus className="plus"/>
          </div>
          <p className="recent">Followed Hashtags</p>
        </div>
        <div className="sidebar_bottom2">
          <p>Discover more</p>
        </div>
      </div>
      <div className="show" onClick={()=>setShowMore(!showMore)} >
        {showMore ? <p>Show Less  &#708;</p> : <p>Show More  &#709;</p>}
      </div>
    </div>
  );
}

export default Sidebar;
