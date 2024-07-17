import React from "react";
import HeroSection from "./HeroSection";
import TopApartments from "./TopApartments";
import HostSection from "./HostSection.tsx";
import AboutUsSection from "./AboutUsSection.tsx";

import useScrollTop from "../../hooks/useScrollTop.ts"


function HomePage() {
  useScrollTop();
  return (
    <>
      <HeroSection />
      <TopApartments />
      <HostSection />
      <AboutUsSection />
    </>
  )
}

export default HomePage;