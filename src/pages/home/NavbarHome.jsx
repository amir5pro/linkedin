import "./NavbarHome.css";
import { BsLinkedin, BsPeopleFill } from "react-icons/bs";
import { GrArticle, GrSchedulePlay } from "react-icons/gr";
import NavbarOption from "./NavbarOption";
import { FaBriefcase } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function NavbarHome() {
  return (
    <div className="home__navbar">
      <div className="home_logo">
        <h1>Linked</h1>
        <BsLinkedin size={30} />
      </div>
      <div className="home_links">
        <div className="nav_icons">
          <NavbarOption Icon={GrArticle} Title="Articles" />
          <NavbarOption Icon={BsPeopleFill} Title="People" />
          <NavbarOption Icon={GrSchedulePlay} Title="Learning" />
          <NavbarOption Icon={FaBriefcase} Title="Jobs" />
          <NavbarOption
            className="desktop"
            Icon={FaDesktop}
            Title="Get the app"
          />
        </div>
        <NavLink className="nav_signup" to="/signup">Sign up</NavLink>
      </div>
    </div>
  );
}

export default NavbarHome;
