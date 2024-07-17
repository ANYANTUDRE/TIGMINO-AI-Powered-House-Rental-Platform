import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import H1Title from "../../Shared/H1Title";

import useScrollTop from "../../hooks/useScrollTop";

import apiService from "../../services/apiService";
import { getUserId } from "../../lib/actions";
import { CurrencyDollarIcon, HomeIcon, AdjustmentsIcon, MoonIcon } from '@heroicons/react/outline';
import ReservationSidebar from "./ReservationSidebar";
import ContactButton from "./ContactButton";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { HeartIcon } from "@heroicons/react/solid";

const PropertyDetailsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams(); // Get the id parameter using useParams hook
  const [property, setProperty] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const propertyData = await apiService.get(`/api/properties/${id}`);
        setProperty(propertyData);

        const userId = await getUserId();
        setUserId(userId);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    fetchData();
    setLoading(false);
  }, [id]); // Include id in the dependency array

  useScrollTop();

  if (!property) {
    return <LoadingSpinner />;
  }

  return (
    <section className="bg-beige-primary-bg min-h-screen">
      <Header />
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-5/6 mx-auto min-h-screen py-8">
          <div className="grid grid-cols-1 gap-4 pb-8">
            {/* Images Section */}
            <div className="col-span-2 flex flex-col gap-4">
              <div className="">
                <img className="h-[400px] w-full rounded-md" src={property.image_url} alt="Main" />
                <div className="absolute top-20 left-20">
                </div>
              </div>
              
              <div className="flex gap-4 items-center">
                <H1Title styling="text-black mb-4">
                  <p>{property.title}</p>
                </H1Title> 
                
                <button onClick={(e) => {e.preventDefault()}}>
                  {/* {property.is_favorite? ( */}
                  {true? (
                    <HeartIcon className="w-8 h-8 mb-2 text-red-500" />
                  ) : (
                    <HeartIcon className="w-8 h-8 mb-2 text-white" />
                  )}
                </button>
                
                  <small className="underline mb-3 text-black">Like if you like it!</small>
              </div>
              
              <h2><strong>Description</strong></h2>
              <p>{property.description}</p>
              <h2><strong>What this place offers</strong></h2>
              <ul className="grid grid-cols-2 gap-2 text-black">
                <li className="flex items-center gap-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-saffron" />
                  <p>
                    <strong>{property.price_per_night} MAD</strong> per night
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <HomeIcon className="w-5 h-5 text-saffron" />
                  <p>
                    <strong>{property.area}</strong> m²
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <AdjustmentsIcon className="w-5 h-5 text-saffron" />
                  <p>
                    <strong>{property.bathrooms}</strong> Bathrooms
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <MoonIcon className="w-5 h-5 text-saffron" />
                  <p>
                    <strong>{property.bedrooms}</strong> Bedrooms
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              {/* <div className="grid grid-cols-2 gap-2">
                <img className="h-[190px] w-full rounded-md" src={property.image1_url} alt="1" />
                <img className="h-[190px] w-full rounded-md" src={property.image2_url} alt="2" />
                <img className="h-[190px] w-full rounded-md" src={property.image3_url} alt="3" />
                <img className="h-[190px] w-full rounded-md" src={property.image4_url} alt="4" />
              </div> */}
              <div className="p-4">
                <ReservationSidebar property={property} userId={userId} />
              </div>
            </div>
          </div>

          <hr className="border-saffron mb-4" />

          {/* Host Details */}
          <div className="flex justify-between items-center gap-4">
            <div className="text-black">
              <div className="flex justify-between items-center gap-4">
                <Link to={`/landlords/${property.landlord.id}`}>
                  {property.landlord.avatar_url && (
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                      <img
                        src={property.landlord.avatar_url}
                        className="w-full h-full object-cover rounded-full"
                        alt="The user name"
                      />
                    </div>
                  )}
                </Link>
                <h1>This apartment is hosted by
                  {/* <Link to={`/landlords/${property.landlord.id}`}> */}
                    <strong>{` ${property.landlord.name}`}</strong>
                  {/* </Link> */}
                
                <p>at <strong>{property.city}</strong></p>
                </h1>
              </div>
              {userId != property.landlord.id && (
                <ContactButton userId={userId} landlordId={property.landlord.id} />
              )}
            </div>
          </div>

          {/* Map Location */}
            
          {/* <hr className="border-t-2 border-saffron"></hr> */}
          <div className="py-4 text-black">
            {/* <h1 className="font-bold text-[22px]">Where you will be</h1> */}
            <div className="mt-4 bg-red-500">
              {/* Embedded Map */}
            </div>
          </div>

        </div>
      )}
      <Footer />
    </section>
  );
}

export default PropertyDetailsPage;
