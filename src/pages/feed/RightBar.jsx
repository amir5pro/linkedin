import React from "react";
import "./RightBar.css";
import { TbBrandFeedly } from "react-icons/tb";
import { SiUpwork } from "react-icons/si";
import { FaPlus } from "react-icons/fa6";
import image from "../../assets/afriwork.png";
import { TbBrandFiverr } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";
import hire from "../../assets/hire.png";
import { BiCopyright } from "react-icons/bi";
import { BsLinkedin } from "react-icons/bs";
function RightBar() {
  return (
    <div className="RightBar">
      <div className="RightBar_top">
        <div className="RightBarTop_header">
          <p>Add to your feed</p>
          <TbBrandFeedly className="brand" />
        </div>
        <div className="recommend">
          <SiUpwork className="Upwork " />
          <div className="company">
            <h4>Upwork</h4>
            <p>
              Company<span>&bull;</span>Software development
            </p>
            <div className="follow">
              <FaPlus />
              <p>Follow</p>
            </div>
          </div>
        </div>
        <div className="recommend">
          <img src={image} className=" logo" />
          <div className="company">
            <h4>Freelance Ethiopia Afriwork</h4>
            <p>
              Company<span>&bull;</span>Human Resource services
            </p>
            <div className="follow">
              <FaPlus />
              <p>Follow</p>
            </div>
          </div>
        </div>
        <div className="recommend">
          <TbBrandFiverr className="fiverr logo" />
          <div className="company">
            <h4>Fiverr</h4>
            <p>
              Company<span>&bull;</span>Freelance platform
            </p>
            <div className="follow">
              <FaPlus />
              <p>Follow</p>
            </div>
          </div>
        </div>
        <div className="view">
          <p>View all recommendations</p>
          <FaArrowRight />
        </div>
      </div>
      <div className="RightBar_bottom">
        <div className="image">
          <img src={hire} className="hire" />
          <p>See who's hiring on Linkedin</p>
        </div>
        <div className="sticky_footer">
          <div className="links">
            <div className="link">
              <p>About</p>
              <p>Accessability</p>
              <p>User agreement</p>
            </div>
            <div className="link">
              <p>Privacy & Terms</p>
              <p>Ad choices</p>
            </div>
            <div className="link">
              <p>Advertising</p>
              <p>Business Services</p>
            </div>
            <div className="link">
              <p>Get the Linkedin app</p>
              <p>More</p>
            </div>
          </div>
          <div className="parent_logo">
            <div className="footer_logo">
              <h1>Linked</h1>
              <BsLinkedin className="logo_linked" />
            </div>
            <p>Linkedin corporation</p>
            <div className="copyright">
              <BiCopyright />
              <p> 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
