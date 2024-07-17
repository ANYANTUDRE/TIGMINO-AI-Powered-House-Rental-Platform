import React from "react";
import hostSectionImg from "../../assets/host-bg.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Animation } from "../../Shared/Animations";
import H1Title from "../../Shared/H1Title";

function HostSection() {

  return (
    <section className="py-20 flex justify-center rounded-br-[60px]" 
      style={{ background: `url('${hostSectionImg}') no-repeat center center / cover`, backgroundRepeat: 'no-repeat ',  }}
    >
      <div className="text-black font-bold bg-white bg-opacity-80 w-[360px] sm:w-[500px] text-center py-10 px-8 rounded rounded-tl-3xl rounded-br-3xl">
        <motion.div 
          className="w-4/5 mx-auto flex flex-col gap-4"
          initial={Animation.initial}
          whileInView={Animation.whileInView}
          viewport={Animation.viewport}
          transition={Animation.transition}
          variants={Animation.variants}    
        >
          <H1Title styling="text-black sm:text-[40px]">
            Become a Host
          </H1Title>
          <p
            className="sm:text-[16px] text-[13px]"
          >Become a part of the Tigmino community and turn your property into a welcoming haven for travelers, all while earning extra income effortlessly.</p>
        </motion.div>
        <motion.div 
          className="mt-8 w-4/5 mx-auto bg-dark-brown py-2 rounded-xl text-white hover:bg-terracotta duration-300 cursor-pointer"
          initial={Animation.initial}
          whileInView={Animation.whileInView}
          viewport={Animation.viewport}
          transition={Animation.transitionDelay}
          variants={Animation.variants}    
        >
          <div><Link to={"/host-registration"}>Join Now</Link></div>
        </motion.div>
      </div>
    </section>
  )
}

export default HostSection;