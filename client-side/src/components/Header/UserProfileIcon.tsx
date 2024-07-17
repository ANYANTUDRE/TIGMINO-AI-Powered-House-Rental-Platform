import React from "react";
import { Link } from "react-router-dom";
import LoginBtnOptions from "../../Shared/LoginBtnOptions";
import { resetAuthCookies } from "../../lib/actions";

interface UserProfileProps {
  isProfileClicked: boolean;
  setisProfileClicked: (value: boolean) => void;
  userId?: string | null;
  noUserAvatar: string;
  userProfileIcon: string;
}

function UserProfileIcon({ isProfileClicked,
                           setisProfileClicked, 
                           userId, 
                           noUserAvatar, 
                           userProfileIcon }: UserProfileProps) {

  const submitLogout = async () => {
    resetAuthCookies();
  }
  
  return (
    <div className="relative">
      <div 
        onClick={() => setisProfileClicked(!isProfileClicked)}
        className="flex justify-center bg-beige-primary-bg w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer shadow-lg"
      >
        <img 
          src={userId ? userProfileIcon : noUserAvatar} 
          alt={noUserAvatar} 
        />
      </div>

      {/*  */}

      {isProfileClicked && (
              <div className="flex absolute top-10 -right-2 bg-beige-primary-bg text-terracotta flex-col w-40 rounded-md shadow-sm overflow-hidden">
                  {userId ? (
                    <>
                      <LoginBtnOptions hasBorder={true}>
                        <Link to={"/dashboard"}>My Account</Link>
                      </LoginBtnOptions>
                      <LoginBtnOptions hasBorder={true}>
                        <Link to={"/api/chat"}>Inbox</Link>
                      </LoginBtnOptions>
                      <LoginBtnOptions hasBorder={true}>
                        <Link to={"/myreservations"}>Reservations</Link>
                      </LoginBtnOptions>
                      <LoginBtnOptions hasBorder={true} onClick={submitLogout}>
                        <Link to={"/"}>Logout</Link>
                      </LoginBtnOptions>
                      <LoginBtnOptions hasBorder={false}>
                          <Link to="/help">Need Help!</Link>
                      </LoginBtnOptions>
                    </>
                  ) : (
                    <>
                      <LoginBtnOptions hasBorder={true}>
                          <Link to="/signin">Sign In</Link>
                      </LoginBtnOptions>
                      <LoginBtnOptions hasBorder={true}>
                          <Link to="/signup">Sign Up</Link>
                      </LoginBtnOptions>

                      {/* Help Pge */}
                      <LoginBtnOptions hasBorder={false}>
                          <Link to="/help">Need Help!</Link>
                      </LoginBtnOptions>
                    </>
                  )}
                </div>
            )}

      {/*  */}

      {/* <div className={`${isProfileClicked ? "flex" : "hidden"} absolute top-10 -right-2 bg-beige-primary-bg text-terracotta flex-col w-28 rounded-md shadow-sm overflow-hidden`}>
        {
          userId ? (
            <>
              <LoginBtnOptions hasBorder={true}>
                <Link to={"/dashboard"}>
                  Dashboard
                </Link>
              </LoginBtnOptions>

              <LoginBtnOptions hasBorder={false}>
                <Link to={"/api/chat"}>
                  Inbox
                </Link>
              </LoginBtnOptions>

              <LoginBtnOptions hasBorder={false}>
                <Link to={"/myreservations"}>
                  My reservations
                </Link>
              </LoginBtnOptions>

              <LoginBtnOptions hasBorder={false} onClick={submitLogout}>
                <Link to={"/signin"}>
                  Logout
                </Link>
              </LoginBtnOptions>

              
            </>
          )
          : (
            <>
              <LoginBtnOptions hasBorder={true}>
                <Link to={"/signin"}>Sign In</Link>
              </LoginBtnOptions>
              <LoginBtnOptions hasBorder={false}>
                <Link to={"/signup"}>Sign Up</Link>
              </LoginBtnOptions>
            </>
          )
        }
      </div> */}
    </div>
  );
}

export default UserProfileIcon;