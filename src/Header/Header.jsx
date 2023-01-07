import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const activeStyle = {
    color: "green"
  };
  return (
    <div className='header-container'>
      <div>Contact Manager</div>
      <div className='header-links'>
        <NavLink
          to='/'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to='settings'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Settings
        </NavLink>
        <NavLink
          to='about'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          About
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
