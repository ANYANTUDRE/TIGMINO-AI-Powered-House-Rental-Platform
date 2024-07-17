import React, { useState } from "react";
import Logo from "../../assets/logo-tigmino.png";
import { motion } from "framer-motion";
import noUserAvatar from "../../assets/noUserAvatar.png";
import hamburgerMenuIcon from "../../assets/burger-menu-icon.png";
import useMediaQuery from "../../hooks/useMediaQuery";
import UserProfileIcon from "./UserProfileIcon";
import NavBar from "./NavBar";
import { XIcon } from '@heroicons/react/solid';
import { Animation } from "../../Shared/Animations";
import { getUserId } from "../../lib/actions";
import { useEffect } from "react";
import apiService from "../../services/apiService";
import AddPropertyButton from "./AddPropertyButton";
import MyFavorites from "./MyFavoritesButton";
import { Link } from "react-router-dom";


function Header() {
  const [userId, setUserId] = useState(null);
  const [avatar_url, setAvatar_url] = useState<string>('');

  const [isProfileClicked, setisProfileClicked] = useState(false);
  const [isSideBarMenuOpen, setisSideBarMenuOpen] = useState(false);
  const isAboveMediumeScreens = useMediaQuery("(min-width: 1060px)");


  useEffect(() => {
    async function fetchUserId() {
      const userId = await getUserId();
      setUserId(userId);

      const landlord = await apiService.get(`/api/auth/${userId}`);
      console.log("lanlord detail", landlord)
      setAvatar_url(landlord.avatar_url);
    }

    fetchUserId();
  }, []);

  return (
    <motion.header
      className="sticky top-0 bg-white z-20 py-4 drop-shadow-md"
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.5}}
      transition={{duration: 0.6}}
      variants={{
        hidden: {opacity: 0},
        visible: {opacity: 1}
      }}
    >
      <div className="absolute inset-0 z-10 before:absolute before:content-zeligePattern before:bottom-[-7px] overflow-hidden"></div>
      <div className="w-[90%] mx-auto relative z-20">
        <div className="flex justify-between items-center gap-8">
          <Link to={"/"}>
            <img src={Logo} alt="Tigmino Logo" className="w-[145px]" />
          </Link>
          {
            // For Larger screens
            isAboveMediumeScreens ? (
            <>
              <NavBar OuterStyling="justify-center"/>

                <AddPropertyButton
                  userId={userId}
                />

                <MyFavorites
                  userId={userId}
                />

              <UserProfileIcon 
                  isProfileClicked={isProfileClicked}
                  setisProfileClicked={setisProfileClicked} 
                  userId={userId}
                  noUserAvatar={noUserAvatar}
                  userProfileIcon={avatar_url} />
            </>
          ) : (
            // For Smaller Screens
            <div className="flex gap-4">

              <AddPropertyButton
                userId={userId}
              />

              <UserProfileIcon 
                  isProfileClicked={isProfileClicked}
                  setisProfileClicked={setisProfileClicked} 
                  userId={userId} 
                  noUserAvatar={noUserAvatar}
                  userProfileIcon={avatar_url} />

              <button 
                className="w-[25px]"
                onClick={() => setisSideBarMenuOpen(!isSideBarMenuOpen)}
              >
                <img src={hamburgerMenuIcon} alt="burger menu icon" />
              </button>
            </div>
          )
          }
        </div>
        {/* Side Bar Menu For Smaller Screens */}
        {
          (!isAboveMediumeScreens && isSideBarMenuOpen) && (
          <motion.div
            initial={Animation.initial}
            whileInView={Animation.whileInView}
            viewport={Animation.viewport}
            transition={Animation.transition}
            variants={Animation.LeftsideVariants}
          >
            <button 
              className="absolute right-0 top-0 w-[22px] z-50"
              onClick={() => setisSideBarMenuOpen(!isSideBarMenuOpen)}  
            >
              <XIcon />
            </button>


            

            <NavBar 
              OuterStyling="absolute bg-beige-primary-bg -right-12 -top-4 w-[300px] h-screen shadow-lg"
              InnerStyling="flex-col pl-12" />
          </motion.div>
          )
        }
        </div>
    </motion.header>
  );
}

export default Header;
