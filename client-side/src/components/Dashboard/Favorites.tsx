import React, { useEffect, useState } from "react";
import H1Title from "../../Shared/H1Title";
import PropetiesGrid from "../../Shared/PropertiesGrid";

// import imageTest from "../../assets/main-bg.jpg"
import useScrollTop from "../../hooks/useScrollTop";
import useSearchModal from "../../hooks/useSearchModal";
import { PropertyType, retrieveProperties } from "../../Shared/RetriveProperties";


function Favorites() {

  // const properties = [
  //   { id: 1, city: "safi", street: "Sidi Bouzid" },
  //   { id: 2, city: "safi", street: "Sidi Bouzid" },
  //   { id: 3, city: "safi", street: "Sidi Bouzid" }
  // ];

  useScrollTop();

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const searchModal = useSearchModal();

  useEffect(() => {
    const fetchProperties = async () => {
      const props = await retrieveProperties(
        {
        query: {
          guests: Number(searchModal.query.guests),
          bathrooms: Number(searchModal.query.bathrooms),
          bedrooms: Number(searchModal.query.bedrooms),
          checkIn: searchModal.query.checkIn,
          checkOut: searchModal.query.checkOut,
          category: searchModal.query.category,
          city: searchModal.query.city,
          area: searchModal.query.area
        }, favorites: true
      }
    );
      setProperties(props);
    };

    fetchProperties();
  }, [searchModal.query]);

  return(
    <section className="p-8 w-full">
      <H1Title styling="text-black">
        <p>My <span className="text-saffron">Favorite</span> Apartments</p>
      </H1Title>
      <div className="py-4">
      <PropetiesGrid 
        properties={properties}
        />
      </div>
    </section>
  )
}

export default Favorites;