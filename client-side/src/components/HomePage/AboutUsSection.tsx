import React from 'react';
import H1Title from '../../Shared/H1Title';
import { motion } from 'framer-motion';
import RiadImage from "../../assets/riad.jpeg";

function AboutUsSection() {

  return (
    <section id="aboutUs" className="py-20 w-full">
      <div className="w-5/6 mx-auto flex flex-wrap justify-center items-center gap-8 px-4 lg:flex-nowrap">
        <motion.div 
          className="flex-1 min-w-[360px] flex flex-col gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.5}}
          transition={{duration: 0.3}}
          variants={{
            hidden: {opacity: 0, x: -80},
            visible: {opacity: 1, x: 0}
          }}  
        >
          <H1Title styling="text-black text-center sm:text-start">
            <p>About Us</p>
          </H1Title>
          <p>Welcome to Tigmino, your premier destination for short-term apartment rentals. Founded with a passion for providing seamless and memorable accommodation experiences, Tigmino is committed to connecting travelers with unique, comfortable, and conveniently located apartments for their short stays.</p>
          <p>At Tigmino, our mission is simple: to revolutionize the way people find and book short-term accommodations. We strive to offer a diverse range of high-quality apartments, ensuring that every guest finds the perfect place to call home during their travels. Whether you're planning a weekend getaway, a business trip, or a longer stay, Tigmino is here to make your experience effortless and enjoyable.</p>
          <p className="bg-dark-brown text-white text-center px-6 sm:px-2 py-2 rounded">
            We strive to offer you the best possible homes to stay in.
          </p>
        </motion.div>
        <motion.div 
          className="flex-1 min-w-[340px] overflow-hidden rounded-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.5}}
          transition={{duration: 0.3, delay: 0.1}}
          variants={{
            hidden: {opacity: 0, x: 80},
            visible: {opacity: 1, x: 0}
          }}  
        >
          <img src={RiadImage} className="w-full h-auto" alt="about us image" />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUsSection;
