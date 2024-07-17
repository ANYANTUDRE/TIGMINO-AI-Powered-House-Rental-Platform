import React, { useEffect, useState } from "react";
import H1Title from "../../Shared/H1Title";

import { motion } from "framer-motion";
import { Animation } from "../../Shared/Animations";
import PropetiesGrid from "../../Shared/PropertiesGrid";
import { retrieveProperties, PropertyType } from "../../Shared/RetriveProperties";
import useSearchModal from "../../hooks/useSearchModal";
import LoadingSpinner from "../../Shared/LoadingSpinner";


function TopApartments() {

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  return(
    <section className="flex items-center justify-center mx-auto py-20 min-h-screen w-full">
      <div className="flex flex-col items-center justify-between mx-[10%]">
        <div className="flex flex-col gap-6 text-center md:w-[60%]">
          <H1Title styling="sm:text-[40px]">
            <motion.p
              initial={Animation.initial}
              whileInView={Animation.whileInView}
              viewport={Animation.viewport}
              transition={Animation.transition}
              variants={Animation.variants}  
            >Top Pick Apartments</motion.p>
          </H1Title>
          <motion.p
            initial={Animation.initial}
            whileInView={Animation.whileInView}
            viewport={Animation.viewport}
            transition={Animation.transitionDelay}
            variants={Animation.variants}  
          >Discover unparalleled comfort and convenience with Top Pick Apartments – where quality meets prime locations for your perfect stay.</motion.p>
        </div>

        <motion.div 
          className="flex flex-wrap mt-14 gap-6 justify-center"
          initial={Animation.initial}
          whileInView={Animation.whileInView}
          viewport={Animation.viewport}
          transition={{duration: 0.5, delay: 0.2}}
          variants={Animation.variants}
        >
        </motion.div>
        <div className="mt-4">
          {
          loading ? (
            <LoadingSpinner />
          ) : (
          <PropetiesGrid 
            properties={properties.slice(0, 3)} 
          />
            )
          }
        </div>
        
      </div>
    </section>
  )
}

export default TopApartments;