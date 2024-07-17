import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import LoginPage from './components/LoginPage';
import RegestrationPage from './components/RegestrationPage';
import HostRegistration from './components/HostRegistration';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TermsAndConditions from './components/TermsAndPrivacy/TermsAndConditions.tsx';
import NotFoundPage from './components/NotFoundPage';
import AllProperties from './components/AllProperties/index.tsx';
import Dashboard from './components/Dashboard/index.tsx';
import PropertyDetailsPage from "../src/components/PropertyDetailsPage";
import MyFavoritesPage from './components/MyFavoritesPage';
import MyReservationsPage from './components/MyReservationsPage';
import InboxPage from './components/inbox/index.tsx';
import ConversationPage from './components/inbox/page.tsx';
import LandlordDetailPage from './components/landlords/landords.tsx';
import HelpPage from './components/HelpPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/all-properties",
    element: <AllProperties />
  },
  {
    path: "/signin",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <RegestrationPage />
  },
  {
    path: "/terms",
    element: <TermsAndConditions />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/host-registration",
    element: <HostRegistration />
  },
  {
    path: "/properties/:id",
    element: <PropertyDetailsPage />
  },

  // new addings
  {
    path: "/favorites",
    element: <MyFavoritesPage />
  },

  {
    path: "/myreservations",
    element: <MyReservationsPage />
  },

  {
    path: "/api/chat",
    element: <InboxPage />
  },

  {
    path: "/api/chat/:id",
    element: <ConversationPage />
  },

  {
    path: "/landlords/:landlordId",
    element: <LandlordDetailPage />
  },
  {
    path: "/help",
    element: <HelpPage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
  ,
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
