import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import Logo from "../../assets/logo-tigmino.png";
import BackHomePageLink from "../../Shared/BackHomePageLink";
import { Animation } from "../../Shared/Animations";
import useMediaQuery from "../../hooks/useMediaQuery";
import { motion } from "framer-motion";
import apiService from "../../services/apiService";
import { handleLogin } from "../../lib/actions";


function LoginPage() {
  const isAboveMediumeScreens = useMediaQuery("(min-width: 500px)");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setLoading(true);

    const formData = {
        email: email,
        password: password
    }

    try {
      const response = await apiService.postWithoutToken('/api/auth/login/', JSON.stringify(formData))

      // test
      console.log("The access is ---> ", response)

      if (response.access) {
          handleLogin(response.user.pk, response.access, response.refresh);
          navigate('/');
      } else {
        setErrors(response.non_field_errors);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors(['An error occurred while logging in. Please try again.']);
    } finally {
      setLoading(false);
    }
}

  return(
    <section className="relative min-h-screen bg-beige-primary-bg w-full flex flex-col items-center justify-center">
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
          >Welcome Back</motion.h3>

          <motion.form
            onSubmit={submitLogin}
            className={`${isAboveMediumeScreens ? "w-[320px]" : "w-[220px]"} flex flex-col gap-4`}
            initial={Animation.initial}
            whileInView={Animation.whileInView}
            viewport={Animation.viewport}
            transition={Animation.transitionDelay}
            variants={Animation.variants}
          >
            <input type="text" required 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Your e-mail address"
              className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
            />

            <input type="password" required 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password"
              className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
              value={password}
            />

            {errors.map((error, index) => {
                return (
                    <div 
                        key={`error_${index}`}
                        className="p-5 bg-beige-primary-bg text-white rounded-xl opacity-80"
                    >
                        {error}
                    </div>
                )
            })}

            <button 
              type="submit" 
              disabled={loading} 
              onClick={submitLogin}
              className="bg-saffron font-bold hover:bg-amber-500 duration-300 text-white py-2 px-4 border border-saffron rounded-full"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

          </motion.form>

          <motion.small
            initial={Animation.initial}
            whileInView={Animation.whileInView}
            viewport={Animation.viewport}
            transition={{duration: 0.3, delay: 0.4}}
            variants={Animation.variants}
          >Need an account? Sign up <Link to={"/signup"} className="underline font-bold">here</Link></motion.small>
        </div>
      </div>
      <BackHomePageLink />
    </section>
  )
}

export default LoginPage;