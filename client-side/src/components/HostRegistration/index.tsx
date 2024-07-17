import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../assets/logo-tigmino.png";
import BackHomePageLink from "../../Shared/BackHomePageLink";
import { Animation } from "../../Shared/Animations";
import useMediaQuery from "../../hooks/useMediaQuery";


function HostRegistration() {
    const isAboveMediumScreens = useMediaQuery("(min-width: 500px)");
    const [hostName, setHostName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hostAddress, setHostAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/api/host/register", { hostName, email, password, hostAddress });
            alert("Registration successful! Please complete your profile.");
            navigate("/host/dashboard");
        } catch (error) {
            alert("Failed to register: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
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
                    >Host Account Registration</motion.h3>
                    <motion.form
                        onSubmit={handleSignUp}
                        className={`${isAboveMediumScreens ? "w-[320px]" : "w-[220px]"} flex flex-col gap-4`}
                        initial={Animation.initial}
                        whileInView={Animation.whileInView}
                        viewport={Animation.viewport}
                        transition={Animation.transitionDelay}
                        variants={Animation.variants}
                    >
                        <input type="text" required placeholder="Host Name"
                            className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                            value={hostName}
                            onChange={(e) => setHostName(e.target.value)}
                        />
                        <input type="email" required placeholder="E-mail"
                            className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="text" required placeholder="Address"
                            className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                            value={hostAddress}
                            onChange={(e) => setHostAddress(e.target.value)}
                        />
                        <input type="tel" required placeholder="Phone number"
                            className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <input type="password" required placeholder="Password"
                            className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" disabled={loading} className="bg-saffron font-bold hover:bg-amber-500 duration-300 text-white py-2 px-4 border border-saffron rounded-full">
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
    );
}

export default HostRegistration;
