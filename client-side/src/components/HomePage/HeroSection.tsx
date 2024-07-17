import React from "react";
import mainImage from "../../assets/riad.jpeg";

import { motion } from "framer-motion";
import { Animation } from "../../Shared/Animations.ts";
import { Link } from "react-router-dom";


function HeroSection() {


  return(
    <section className="min-h-[90vh] flex flex-col gap-10 justify-center items-center rounded-br-[60px] overflow-hidden"
      style={{ background: `url('${mainImage}') no-repeat center center / cover`, backgroundRepeat: 'no-repeat ',  }}>
      <motion.div 
        className="text-center text-white"
        initial={Animation.initial}
        whileInView={Animation.whileInView}
        viewport={Animation.viewport}
        transition={Animation.transition}
        variants={Animation.sideVariants}  
      >
        <h1 className="text-[50px] font-bold">FIND YOUR APARTMENT</h1>
        <h3 className="text-saffron font-bold mt-4">YOUR NEXT HOME JUST A CLICK AWAY</h3>
      </motion.div>

      <motion.div 
        initial={Animation.initial}
        whileInView={Animation.whileInView}
        viewport={Animation.viewport}
        transition={Animation.transitionDelay}
        variants={Animation.sideVariants}
      >
        {/* <FiltrationBar /> */}
        <div className="bg-saffron rounded-md shadow-lg py-2 px-4">
          <Link to={"/all-properties"}>
            <p className="text-white font-bold">Find an Apartment</p>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection;