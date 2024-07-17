import React, { useState, useEffect } from "react";
import Header from "../Header";
import H1Title from "../../Shared/H1Title";
import Footer from "../Footer";
import FiltrationBar from "../../Shared/FiltrationBar";
import useScrollTop from "../../hooks/useScrollTop.ts";
import { motion } from "framer-motion";
import { Animation } from "../../Shared/Animations";
import Categories from "./Categories.tsx";
import PropertiesGrid from "../../Shared/PropertiesGrid.tsx";
import { retrieveProperties, PropertyType } from "../../Shared/RetriveProperties.ts";
import useSearchModal from "../../hooks/useSearchModal.ts"; // Import useSearchModal
import LoadingSpinner from "../../Shared/LoadingSpinner.tsx";

function AllProperties() {
  useScrollTop();

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const searchModal = useSearchModal();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const props = await retrieveProperties({
        query: {
          guests: Number(searchModal.query.guests),
          bathrooms: Number(searchModal.query.bathrooms),
          bedrooms: Number(searchModal.query.bedrooms),
          checkIn: searchModal.query.checkIn,
          checkOut: searchModal.query.checkOut,
          category: searchModal.query.category,
          city: searchModal.query.city,
          area: searchModal.query.area
        }
      });
      setProperties(props);
      setLoading(false);
    };

    fetchProperties();
  }, [searchModal.query]);

  return (
    <section className="mx-auto min-h-screen bg-beige-primary-bg flex flex-col">
      <Header />
      <div className="relative flex flex-col gap-6 py-16 bg-gradient-to-r from-coral to-indigo">
        <motion.div
          className="text-center"
          initial={Animation.initial}
          whileInView={Animation.whileInView}
          viewport={Animation.viewport}
          transition={Animation.transition}
          variants={Animation.sideVariants}
        >
          <H1Title styling="text-white sm:text-[40px]">
            <p>All Properties</p>
          </H1Title>
          <small className="text-white">124 results</small>
        </motion.div>
        <motion.div
          className="flex justify-center py-8"
          initial={Animation.initial}
          whileInView={Animation.whileInView}
          viewport={Animation.viewport}
          transition={Animation.transitionDelay}
          variants={Animation.sideVariants}
        >
          <FiltrationBar />
        </motion.div>
      </div>

      <Categories />

      <div className="w-5/6 mx-auto py-12">
        <div className="flex flex-wrap gap-6 justify-center items-center mt-6">
          {loading? (
            <LoadingSpinner />
          ) : (
            <PropertiesGrid properties={properties} />
          )}
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default AllProperties;
