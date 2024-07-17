import React from "react";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from '@heroicons/react/solid';

interface ApartmentDetails {
  id: string;
  title: string;
  image_url:  string;
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

function ApartmentCard({ id, title, image_url, image1_url, image2_url, image3_url, image4_url, price_per_night, bedrooms, bathrooms, guests, area, city, is_favorite }: ApartmentDetails) {
  const navigate = useNavigate();

  return (
    <div 
      className="cursor-pointer"
      onClick={() => navigate(`/properties/${id}`)}
    >
      <div key={id} className="relative max-w-[320px] flex flex-col shadow-sm rounded-br-3xl rounded-md bg-white overflow-hidden cursor-pointer">
          
        <div className="max-h-[180px] rounded-br-3xl overflow-hidden">
          <img 
            src={image_url} 
            alt={title} 
            className="hover:scale-110 object-cover transition h-full w-full" 
          />
        </div>
        

        <div className="text-black px-6 py-6">
          <p> {title} • {city}</p>
          <h3 className="font-bold text-[22px]">{title}</h3>
          <div className="flex justify-between">
            <div className="mt-2">
              <p>{guests} guests</p>
              <p>{bedrooms} bedrooms</p>
            </div>
            <div className="mt-2">
              <p> {area} m²</p>
              <p>{bathrooms} bathrooms</p>
            </div>
          </div>
        </div>
          
        <div className="flex w-[90%] mx-[5%] justify-between absolute">
          <div className="bg-beige-primary-bg px-2 py-1 mt-4 bg-opacity-80 rounded rounded-br-3xl border-b-2 border-terracotta text-black font-sm">
            {price_per_night} MAD
          </div>
        </div>
          
        {/* {is_favorite && (
          <FavoriteButton
            id={id}
            is_favorite={is_favorite}
            // markFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )} */}

        <div className="absolute top-3 right-2">
          {is_favorite? (
            <HeartIcon className="w-8 h-8 mr-2 text-red-500" />
          ) : (
            <HeartIcon className="w-8 h-8 mr-2 text-white" />
          )}
        </div>

      </div>
    </div>
  );
}

export default ApartmentCard;