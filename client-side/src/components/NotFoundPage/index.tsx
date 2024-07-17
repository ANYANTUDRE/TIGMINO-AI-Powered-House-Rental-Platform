import React from "react";
import LogoTigmino from "../../assets/logo-tigmino.png";
import PageNotFoundBg from "../../assets/404PageBg.png"
import H1Title from "../../Shared/H1Title";
import { Link } from "react-router-dom";

function NotFoundPage() {

  return(
    <section 
      className="bg-beige-primary-bg w-full min-h-screen flex flex-col gap-20 items-center"
      style={{ background: `url('${PageNotFoundBg}') no-repeat center center / cover`, backgroundRepeat: 'no-repeat ',  }}  
    >
      <div className="flex justify-center mt-16">
        <img className="w-[200px]" src={LogoTigmino} alt="logo tigmino" />
      </div>
      <div className="flex flex-col gap-8 text-center items-center">
        <H1Title styling="text-dark-brown">
          <p>Ooups, Page Not Found</p>
        </H1Title>
        <p>We are sorry for the inconvenience. it looks you are trying to<br></br>access a page that has been deleted or never existed.</p>
        <button className="bg-terracotta text-white font-bold py-3 rounded-lg w-[200px] cursor-pointer hover:bg-dark-brown duration-300">
          <Link to={"/"}>BACK TO HOME PAGE</Link>
        </button>
      </div>
    </section>
  )
}

export default NotFoundPage;