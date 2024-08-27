import { useState } from "react";
import { Link } from "react-router-dom";

import { images } from "./../../constants";

import { HiMenuAlt4, HiX } from "react-icons/hi";
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
          <img src={images.vite} alt="logo" />
        </Link>
      </div>
      <ul className="app__navbar-links">
        {["login", "register", "habit", "dashboard"].map((item) => (
          <li key={`links-${item}`} className="app__flex p-text">
            <div />
            <Link to={`/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <div
            whileinview={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["login", "register", "habit", "dashboard"].map((item) => (
                <li key={item}>
                  <Link to={`/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
