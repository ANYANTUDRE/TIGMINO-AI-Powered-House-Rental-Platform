import apiService from "../../services/apiService";
import React from "react";
import { HeartIcon } from '@heroicons/react/solid';

interface FavoriteButtonProps {
  id: string;
  is_favorite: boolean;
  markFavorite: (is_favorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  is_favorite,
  markFavorite
}) => {
  const toggleFavorite = async () => {
    try {
      const response = await apiService.post(`/api/properties/${id}/toggle_favorite/`, {});
      markFavorite(response.is_favorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <div
      onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
      className="absolute top-2 right-2 ${is_favorite ? 'text-red-800 fill-red' : 'text-white'} hover:text-red-500`"
    >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" fill="currentColor" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
    </div>
  );
};

export default FavoriteButton;
