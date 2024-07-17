import { useEffect, useState } from 'react';
import { getUserId } from "../../lib/actions";
import React from "react";
import BackHomePageLink from "../../Shared/BackHomePageLink";
import H1Title from "../../Shared/H1Title";
import { PropertyType, retrieveProperties } from '../../Shared/RetriveProperties';
import useScrollTop from '../../hooks/useScrollTop';
import useSearchModal from '../../hooks/useSearchModal';
import LoadingSpinner from "../../Shared/LoadingSpinner";
import PropertiesGrid from '../../Shared/PropertiesGrid';

const MyFavoritesPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
      const fetchUserId = async () => {
          const userId = await getUserId();
          setUserId(userId);
          console.log("Here is the userId", userId)
      };

      fetchUserId();
  }, []);

  useScrollTop();

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchModal = useSearchModal();

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, [searchModal.query]);
  

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    )
  }

return (
  <section className="relative w-full bg-beige-primary-bg mx-auto min-h-screen">
    <H1Title styling="text-black p-6">
      <p>My <span className="text-saffron">Favorite</span> Apartments</p>
    </H1Title>
    <div className="p-8 h-full flex justify-center items-center ">
      {loading? (
        <LoadingSpinner />
      ) : (
        <PropertiesGrid properties={properties} />
      )}
    </div>
    <div className="absolute p-3 right-0 w-[270px] top-8">
      <BackHomePageLink />
    </div>
  </section>
)
}

export default MyFavoritesPage;
