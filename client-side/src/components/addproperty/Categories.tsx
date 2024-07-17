import React from "react";
// import CategoryBeach from "../../assets/icn_category_beach.jpeg";
import { FaHome, FaHotel, FaTree, FaUmbrellaBeach } from "react-icons/fa";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
                <div 
                    onClick={() => setCategory('beach')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'beach' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    {/* <img
                        src= {CategoryBeach}
                        alt="Category - Beach"
                        className="w-20 h-20"
                    /> */}
                    <FaUmbrellaBeach className="w-4 h-4 mr font-" />
                    <span className='text-xs'>Beach</span>
                </div>

                <div 
                    onClick={() => setCategory('villas')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'villas' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    {/* <img 
                        src= {CategoryBeach}
                        alt="Category - Beach" 
                        className="w-20 h-20" 
                    /> */}
                    <FaHotel className="w-4 h-4 mr font-" />
                    <span className='text-xs'>Villas</span>
                </div>

                <div 
                    onClick={() => setCategory('cabins')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'cabins' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    {/* <img 
                        src= {CategoryBeach}
                        alt="Category - Beach" 
                        className="w-20 h-20" 
                    /> */}
                    <FaTree className="w-4 h-4 mr font-" />
                    <span className='text-xs'>Cabins</span>
                </div>

                <div 
                    onClick={() => setCategory('tiny_homes')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'tiny_homes' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    {/* <img 
                       src= {CategoryBeach}
                        alt="Category - Beach" 
                        className="w-20 h-20"
                    /> */}
                    <FaHome className="w-4 h-4 mr font-" />
                    <span className='text-xs'>Tiny homes</span>
                </div>
            </div>
        </>
    )
}

export default Categories;