import React from "react";
import { Link } from "react-router-dom"; 


interface NavbarProps {
  OuterStyling?: string;
  InnerStyling?: string;
}

function NavBar({ OuterStyling, InnerStyling }: NavbarProps) {

  return(
    <nav className={`${OuterStyling} flex flex-1 items-center`}>
      <ul className={`${InnerStyling} flex gap-8 text-dark-brown font-bold`}>
        <li>
          <Link to={"/"} className="hover:text-terracotta duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/all-properties" className="hover:text-terracotta duration-300">
            All Properties
          </Link>
        </li>
        <li>
       

        </li>
      </ul>
    </nav>
  );
}

export default NavBar;