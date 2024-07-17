import React, { useState } from "react";
import { useNavigate, Link, Router } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "../../assets/logo-tigmino.png";
import BackHomePageLink from "../../Shared/BackHomePageLink";
import { Animation } from "../../Shared/Animations";
import useMediaQuery from "../../hooks/useMediaQuery";
import apiService from "../../services/apiService";
import { handleLogin } from "../../lib/actions";


function RegistrationPage() {
  const isAboveMediumeScreens = useMediaQuery("(min-width: 500px)");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true


    const formData = {
      name: name,
      //username: username,
      email: email,
      password1: password1,
      password2: password2
    }

    try {
      const response = await apiService.postWithoutToken('/api/auth/register/', JSON.stringify(formData));

      if (response.access) {
          handleLogin(response.user.pk, response.access, response.refresh);
          navigate('/');
      } else {
        // Assuming response has a field 'non_field_errors' containing error messages
        setErrors(response.non_field_errors || ['An unknown error occurred']);
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      setErrors(['An error occurred while signing up. Please try again.']);
    } finally {
      setLoading(false); // Set loading state to false after API call completes
    }
};

  return(
    <section className="relative min-h-screen bg-beige-primary-bg w-full flex items-center justify-center">
      <div className="bg-white rounded-xl text-black overflow-hidden shadow-md">
        <div className="bg-saffron flex justify-center p-6 rounded-b-[40px]">
          <img src={Logo} alt="Logo" className="w-[100px]"/>
        </div>
        <div className="px-8 sx:px-12 py-6 flex flex-col justify-between items-center gap-8">
          <motion.h3
            initial={Animation.initial}
            whileInView={Animation.whileInView}
            viewport={Animation.viewport}
            transition={Animation.transition}
            variants={Animation.variants}
          >Create Account</motion.h3>
          <motion.form
            onSubmit={submitSignup}
            className={`${isAboveMediumeScreens ? "w-[320px]" : "w-[220px]"} flex flex-col gap-4`}
            initial={Animation.initial}
            whileInView={Animation.whileInView}
            viewport={Animation.viewport}
            transition={Animation.transitionDelay}
            variants={Animation.variants}
          >
            <input type="text" required placeholder="Full Name"
              className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input type="text" required placeholder="Username"
              className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input type="email" required placeholder="E-mail"
              className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" required placeholder="Password"
              className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <input type="password" required placeholder="Confirm Password"
              className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            {errors.map((error, index) => {
                return (
                    <div 
                        key={`error_${index}`}
                        className="p-5 bg-red-500 text-white rounded-xl opacity-80"
                    >
                        {error}
                    </div>
                )
            })}


            <button 
              type="submit" 
              onClick={submitSignup}
              disabled={loading} 
              className="bg-saffron font-bold hover:bg-amber-500 duration-300 text-white py-2 px-4 border border-saffron rounded-full"
              >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </motion.form>
          <motion.small
            initial={Animation.initial}
            whileInView={Animation.whileInView}
            viewport={Animation.viewport}
            transition={{duration: 0.3, delay: 0.4}}
            variants={Animation.variants}
          >Already have an account? Sign in <Link to={"/signin"} className="underline font-bold">here</Link></motion.small>
        </div>
      </div>
      <BackHomePageLink />
    </section>
  )
}

export default RegistrationPage;