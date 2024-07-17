import React from "react";
import { useNavigate } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";


interface MyFavoritesProps {
    userId?: string | null;
}

const MyFavorites: React.FC<MyFavoritesProps> = ({
    userId
}) => {
    const navigate = useNavigate();

    return (
        userId &&
        <div
            onClick={() => navigate("/favorites")}
            className="dark-brown font-bold hover:text-terracotta p-2 cursor-pointer rounded-full hover:bg-gray-200"
            style={{ borderWidth: '1px', borderColor: '' }}
        >
            <GrFavorite style={{ fontSize: '25px' }} />
        </div>
    )
}

export default MyFavorites;
