import React, { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

import { CogIcon, BellIcon, UserIcon, CalendarIcon, CollectionIcon, CreditCardIcon, MenuIcon, XIcon, HeartIcon } from '@heroicons/react/solid';
import ProfileManagement from "./ProfileManagement";
import Notifications from "./Notifications";
// import Bookings from "./BookingManagement";
import Bookings from "../MyReservationsPage";
import Listings from "./ListingManagement";
import Payments from "./Payment"
import ProfileEdit from "./ProfileEdit";
import Favorites from "./Favorites";


import BackHomePageLink from "../../Shared/BackHomePageLink";

interface SidebarButtons {
  icon: JSX.Element;
  label: string;
}


function Dashboard() {

  const sidebarButtons: SidebarButtons[] = [
    { icon: <UserIcon className="w-5 h-5 mr-2" />, label: 'Profile' },
    { icon: <BellIcon className="w-5 h-5 mr-2" />, label: 'Inbox' },
    { icon: <CalendarIcon className="w-5 h-5 mr-2" />, label: 'Bookings' },
    { icon: <CollectionIcon className="w-5 h-5 mr-2" />, label: 'Listings' },
    { icon: <HeartIcon className="w-5 h-5 mr-2" />, label: 'Favorites' },
    { icon: <CreditCardIcon className="w-5 h-5 mr-2" />, label: 'Payments' },
    { icon: <CogIcon className="w-5 h-5 mr-2" />, label: 'Edit' },
  ];

  const isAboveMediumeScreens = useMediaQuery("(min-width: 900px)");
  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>("Profile");

  function renderPageComponent(page: string) {
    switch (page) {
      case 'Profile':
        return <ProfileManagement />;
      case 'Inbox':
        return <Notifications />;
      case 'Bookings':
        return <Bookings />;
      case 'Listings':
        return <Listings />;
      case 'Payments':
        return <Payments />;
      case 'Edit':
        return <ProfileEdit />;
      case 'Favorites':
        return <Favorites />
      default:
        return <ProfileManagement />;
    }
  }

  return (
    <div className="relative flex min-h-screen p-2 gap-2 bg-beige-primary-bg overflow-hidden">
      
      {/* side bar */}
      <div className={`flex flex-col gap-2 bg-dark-brown py-4 rounded-md shadow-lg text-white ${isAboveMediumeScreens && isSidebarOpened? "w-1/6" : "w-auto"}`}>
        <div className="flex items-center ml-4 py-4">
          { isAboveMediumeScreens &&
            <button onClick={() => setIsSidebarOpened(!isSidebarOpened)}>
              { isSidebarOpened? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/> }
            </button>
          }
        </div>
        {
          sidebarButtons.map(button => (
            <div key={ button.label } className={`rounded-l-full ${ currentPage === button.label? "bg-terracotta" : "" }`}>
              <button 
                className="flex w-full items-center pl-4 py-3 pr-2"
                onClick={() => {
                  setCurrentPage(button.label);
                }}
              >
                { button.icon }
                { isSidebarOpened && isAboveMediumeScreens && button.label}
              </button>
            </div>
          ))
        }

      </div>
      {/* main content */}
      <div className={`flex flex-1 h-full `}>
        <div className="flex grow rounded-md">
          { renderPageComponent(currentPage) }
        </div>
      </div>

      {/* Get back to home page */}
      <div className="bg-white absolute bottom-0 right-4 w-[240px]">
        <BackHomePageLink />
      </div>

    </div>

  );
}

export default Dashboard;