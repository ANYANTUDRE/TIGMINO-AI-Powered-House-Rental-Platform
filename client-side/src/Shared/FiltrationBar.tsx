import React from "react";
import filterIcom from "../assets/filter-icon.png";
import useMediaQuery from "../hooks/useMediaQuery";
import useSearchModal from "../hooks/useSearchModal";

const CITIES: string[] = ["Safi", "Rabat", "Tangie", "Agadir", "Marrakech", "Casablanca"];
const GUESTS: number[] = [1, 2, 3, 4, 5];
const PRICES: number[] = [50, 100, 150, 200, 300, 1000, 1590];


function FiltrationBar() {
  const searchModal = useSearchModal();
  const isAboveMediumeScreens = useMediaQuery("(min-width: 760px)");

  return (
    isAboveMediumeScreens ? (
      <div onClick={() => searchModal.open('location')}
        className="bg-white pl-6 rounded-full flex items-center shadow-md">
        <div className="border-l-2 border-r-2 border-saffron px-4">
          <select className="outline-none cursor-pointer">
            {CITIES.map(city => (
              <option key={`${Math.random()}${city}`} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="border-r-2 border-saffron px-4 cursor-pointer">
          <input type="date" 
            name="datePicker" 
            id="datePicker" 
            className="outline-none"
          />
        </div>

        <div className="border-r-2 border-saffron px-4">
          <select className="outline-none cursor-pointer">
            {GUESTS.map(guest => (
              <option key={`${Math.random()}${guest}`} value={guest}>{`${guest} Guests`}</option>
            ))}
          </select>
        </div>

        <div className="px-4">
          <select className="outline-none cursor-pointer">
            {PRICES.map(price => (
              <option key={`${Math.random()}${price}`} value={price}>{`${price} MAD`}</option>
            ))}
          </select>
        </div>

        <button className="rounded-r-full bg-saffron py-3 px-5 hover:bg-opacity-70 duration-300">
          <img src={filterIcom} alt={filterIcom} className="w-[23px]"/>
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-8">
        <div className="bg-white pl-6 rounded-full flex items-center py-2 shadow-md">
          <div className="border-r-2 border-saffron px-4">
            <select className="outline-none cursor-pointer">
              {CITIES.map(city => (
                <option key={`${Math.random()}${city}`} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="px-4 cursor-pointer">
            <input type="date" 
              name="datePicker" 
              id="datePicker" 
              className="outline-none"
            />
          </div>
        </div>
        <div className="bg-white pl-6 rounded-full flex items-center py-2 shadow-md">
          <div className="border-r-2 border-saffron px-4">
            <select className="outline-none cursor-pointer">
              {GUESTS.map(guest => (
                <option key={`${Math.random()}${guest}`} value={guest}>{`${guest} Guests`}</option>
              ))}
            </select>
          </div>
          <div className="px-4">
            <select className="outline-none cursor-pointer">
              {PRICES.map(price => (
                <option key={`${Math.random()}${price}`} value={price}>{`${price} MAD`}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="flex gap-4 items-center text-white rounded-lg bg-saffron py-2 px-5 hover:bg-opacity-70 duration-300">
            filter
            <img src={filterIcom} alt={filterIcom} className="w-[18px]"/>
          </button>
        </div>
      </div>
    )
  );
}


export default FiltrationBar;