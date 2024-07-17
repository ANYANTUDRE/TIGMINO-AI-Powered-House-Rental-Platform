import React, { useState } from 'react';
import useSearchModal, { SearchQuery } from '../../hooks/useSearchModal';
// import CategoryBeach from "../../assets/icn_category_beach.jpeg";

import { FaHome, FaTree, FaHotel, FaUmbrellaBeach } from 'react-icons/fa';

const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            city: searchModal.query.city,
            area: searchModal.query.area,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bedrooms: searchModal.query.bedrooms,
            bathrooms: searchModal.query.bathrooms,
            category: _category
        };

        searchModal.setQuery(query);
    };

    const categories = [
        { id: '', label: 'All', icon: <FaHome className="w-4 h-4 mr" /> },
        { id: 'beach', label: 'Beach', icon: <FaUmbrellaBeach className="w-4 h-4 mr" /> },
        { id: 'villas', label: 'Villas', icon: <FaHotel className="w-4 h-4 mr" /> },
        { id: 'cabins', label: 'Cabins', icon: <FaTree className="w-4 h-4 mr" /> },
        { id: 'tiny_homes', label: 'Tiny homes', icon: <FaHome className="w-4 h-4 mr" /> },
    ];

    return (
        <div className="pt-8 flex justify-center items-center space-x-12">
            {categories.map((cat) => (
                <div
                    key={cat.id}
                    onClick={() => _setCategory(cat.id)}
                    className={`pb-4 flex flex-col items-center text-terracotta space-y-2 border-b-2 ${category === cat.id ? 'border-terracotta' : 'border-white'} hover:border-terracotta cursor-pointer`}>
                    {cat.icon}
                    <span className='text-xs text-black font-semibold'>{cat.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Categories;
