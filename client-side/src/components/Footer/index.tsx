import React from "react";
import Logo from "../../assets/logo-tigmino.png";
import { Link } from "react-router-dom";
// import useMediaQuery from "../../hooks/useMediaQuery";

import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { TerminalIcon } from "@heroicons/react/solid";
import ContactForm from "../../Shared/ContactForm";

function Footer() {

  // const isAboveMediumeScreens = useMediaQuery("(min-width: 520px)");

  const socialLinks = [
    {label: "fb", icon: <FaFacebookF className="w-4 h-4 mr" />},
    {label: "x", icon: <FaTwitter className="w-4 h-4 mr" />},
    {label: "linkedin", icon: <FaLinkedinIn className="w-4 h-4 mr" />},
    {label: "git", icon: <TerminalIcon className="w-4 h-4 mr" />}
  ];

  return(
    <footer id="contact-us" className="bg-gray-100 py-16 rounded-tl-[100px] shadow-lg">
      <div className="text-black">
        {/*  */}
        <ContactForm />
        {/* <div className="flex flex-wrap gap-8 justify-center ">
          <motion.div
            className="flex flex-col justify-between bg-slate-600 text-white p-10 rounded rounded-tr-[50px] shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
            transition={{duration: 0.3}}
            variants={{
              hidden: {opacity: 0, y: 80},
              visible: {opacity: 1, y: 0}
            }}  
          >
            <h1 className="font-bold text-[26px]">Lets's Connect</h1>
            <ul className="flex flex-col gap-2">
              <li><b>Phone</b> +212 00000000</li>
              <li><b>Email</b> support@tigmino.com</li>
              <li><b>Address</b> Morocco - ENSA Safi</li>
            </ul>
            <ul className="flex items-center gap-3 my-2">
              { socialLinks.map(link => (
                <li key={link.label}>
                  <button className="bg-white text-black p-2 rounded-full shadow-lg flex justify-center items-center">
                    {link.icon}
                  </button>
                </li>
                ))
              }
            </ul>
          </motion.div>
          <motion.div
            className="bg-white sm:p-10 p-6 rounded rounded-br-[50px] shadow-md"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
            transition={{duration: 0.3, delay: 0.1}}
            variants={{
              hidden: {opacity: 0, y: 80},
              visible: {opacity: 1, y: 0}
            }}  
          >
            <h2 className="font-bold sx:text-[25px] text-[20px] mb-4">We'd love to hear from you</h2>
            <form action="submit">
              <div className={`${isAboveMediumeScreens ? "" : "flex-col"} flex gap-2 mb-2`}>
                <input type="text" placeholder="Your Name" required 
                  className="outline-none border-b-2 border-slate-600 py-1"
                />
                <input type="email" placeholder="Email" required 
                  className="outline-none border-b-2 border-slate-600 py-1"
                />
              </div>
              <textarea placeholder="Message" required cols={isAboveMediumeScreens ? 48 : 30} 
                className="outline-none border-b-2 border-slate-600 py-1 mb-2"
              />
              <div className="flex gap-2">
                <input type="checkbox" required />
                <small>I accept the terms and conditions</small>
              </div>
              <button 
                type="submit"
                className="mt-4 bg-slate-500 text-white shadow-lg rounded px-8 py-1 hover:bg-slate-700 duration-300"
                onClick={(event) => event.preventDefault()}
              >Send</button>
            </form>
          </motion.div>
        </div> */}
        {/*  */}
        <div className="flex flex-wrap sm:text-left text-center gap-10 justify-center items-center w-5/6 mx-auto pt-20">
          <div className="basis-[40%] min-w-[300px] flex flex-col items-center sm:items-start">
            <img src={Logo} alt="footer logo" 
              className="w-[160px]"
            />
            <p className="mt-2">Ready to start planning your next adventure? Browse our selection of apartments today and experience the Tigmino difference for yourself.</p>
            <ul className="flex-col sm:flex gap-2 mt-2">
              <li>
                <Link to={"/terms"} className="underline">Terms & Conditions</Link>
              </li>
              <li>
                <Link to={"/terms"} className="underline">Privacy Notice and Cookies</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start basis-[40%] min-w-[300px]">
            <h3 className="font-bold">Contact Us</h3>
            <ul className="mt-2">
              <li>
                +212 00000000
              </li>
              <li>
                support@tigmino.com
              </li>
            </ul>
            <ul className="flex gap-8 my-2">
              { socialLinks.map(link => (
                <li key={link.label}>
                  <button className="bg-white text-black p-2 rounded-full shadow-lg flex justify-center items-center">
                    {link.icon}
                  </button>
                </li>
                ))
              }
            </ul>
            <small>&copy; copyright 2024 - Tigmino. All rights are reserved.</small>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer;