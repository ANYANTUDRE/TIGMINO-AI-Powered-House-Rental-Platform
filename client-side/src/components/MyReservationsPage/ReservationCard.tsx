import React from "react";
// import { PropertyType } from "./ApartmentsList";
// import FavoriteButton from "../components/form/FavoriteButton";
import { useNavigate } from "react-router-dom";

interface ApartmentDetails {
  // property: PropertyType;
  // markFavorite?: (is_favorite: boolean) => void;
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
  endDate: string;
  startDate: string;
  guests: number;
  area: number;
  city: string;
  is_favorite: boolean;
}

function ApartmentCard({ id, title, image_url, price_per_night, startDate, endDate, guests, area, city, is_favorite }: ApartmentDetails) {
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
          <div className="">
            <div className="mt-2 flex flex-col">
              <p><strong>Start Date :</strong> {startDate}</p>
              <p><strong>End Date :</strong> {endDate}</p>
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
            markFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )} */}

      </div>
    </div>
  );
}

export default ApartmentCard;
