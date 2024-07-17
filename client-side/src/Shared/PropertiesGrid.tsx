import { motion } from "framer-motion";
import React from "react";
import ApartmentCard from "./ApartmentCard";
import { Animation } from "./Animations";
// import { PropertyType } from "./ApartmentsList";

interface Property {
  id: string;
  title: string;
  image_url: string;

  image1_url?: string;
  image2_url?: string;
  image3_url?: string;
  image4_url?: string;

  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: number;
  city: string;
  is_favorite: boolean;
}

interface PropetiesGridProps {
  properties: Property[];
}

function PropetiesGrid({ properties }: PropetiesGridProps) {

  return(
    <section>
      <div 
          className="flex flex-wrap gap-6 justify-center items-center"
        >
          {
            properties.map((property, index) => (
              <motion.div
                key={index}
                initial={Animation.initial}
                whileInView={Animation.whileInView}
                viewport={Animation.viewport}
                transition={{transition: 0.3, delay: index * 0.1}}
                variants={Animation.variants}
              >
                <ApartmentCard {...property} />

              </motion.div>
            ))
          }
        </div>
    </section>
  )
}

export default PropetiesGrid;