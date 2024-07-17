import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { TerminalIcon } from "@heroicons/react/solid";
import useMediaQuery from "../hooks/useMediaQuery";
import apiService from "../services/apiService";
import { useNavigate } from 'react-router-dom';

function ContactForm() {
  // States
  const [errors, setErrors] = useState<string[]>([]);
  const [dataName, setDataName] = useState('');
  const [dataEmail, setDataEmail] = useState('');
  const [dataMessage, setMessage] = useState('');
  const navigate = useNavigate();

  // Submit
  const submitForm = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (dataName && dataEmail && dataMessage) {
      const formData = new FormData();
      formData.append('name', dataName);
      formData.append('email', dataEmail);
      formData.append('query_text', dataMessage);

      try {
        const response = await apiService.post('/api/auth/contact/', formData);
        if (response.success) {
          console.log('SUCCESS :-D');
          navigate('/?added=true');
        } else {
          const tmpErrors = Object.values(response).map((error: any) => error.message);
          setErrors(tmpErrors);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    } else {
      setErrors(['All fields are required.']);
    }
  }

  const isAboveMediumScreens = useMediaQuery("(min-width: 520px)");

  const socialLinks = [
    { label: "fb", icon: <FaFacebookF className="w-4 h-4" /> },
    { label: "x", icon: <FaTwitter className="w-4 h-4" /> },
    { label: "linkedin", icon: <FaLinkedinIn className="w-4 h-4" /> },
    { label: "git", icon: <TerminalIcon className="w-4 h-4" /> }
  ];

  return (
    <div className="flex flex-wrap gap-8 justify-center ">
      <motion.div
        className="flex flex-col justify-between bg-slate-600 text-white p-10 rounded rounded-tr-[50px] shadow-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 80 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <h1 className="font-bold text-[26px]">Let's Connect</h1>
        <ul className="flex flex-col gap-2">
          <li><b>Phone</b> +212 00000000</li>
          <li><b>Email</b> support@tigmino.com</li>
          <li><b>Address</b> Morocco - ENSA Safi</li>
        </ul>
        <ul className="flex items-center gap-3 my-2">
          {socialLinks.map(link => (
            <li key={link.label}>
              <button className="bg-white text-black p-2 rounded-full shadow-lg flex justify-center items-center">
                {link.icon}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="bg-white sm:p-10 p-6 rounded rounded-br-[50px] shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        variants={{
          hidden: { opacity: 0, y: 80 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <h2 className="font-bold sx:text-[25px] text-[20px] mb-4">We'd love to hear from you</h2>
        <form onSubmit={submitForm}>
          <div className={`${isAboveMediumScreens ? "" : "flex-col"} flex gap-2 mb-2`}>
            <input type="text" placeholder="Your Name" required
              onChange={(e) => setDataName(e.target.value)}
              className="outline-none border-b-2 border-slate-600 py-1"
            />
            <input type="email" placeholder="Email" required
              onChange={(e) => setDataEmail(e.target.value)}
              className="outline-none border-b-2 border-slate-600 py-1"
            />
          </div>
          <textarea placeholder="Message" required cols={isAboveMediumScreens ? 48 : 30}
            onChange={(e) => setMessage(e.target.value)}
            className="outline-none border-b-2 border-slate-600 py-1 mb-2"
          />
          <div className="flex gap-2">
            <input type="checkbox" required />
            <small>I accept the terms and conditions</small>
          </div>

          {/* {errors.map((error, index) => (
            <div
              key={`error_${index}`}
              className="p-5 text-white bg-red-500 rounded-xl opacity-80"
            >
              {error}
            </div>
          ))} */}

          <button
            type="submit"
            className="mt-4 bg-slate-500 text-white shadow-lg rounded px-8 py-1 hover:bg-slate-700 duration-300"
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ContactForm;
