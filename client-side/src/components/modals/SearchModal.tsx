import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import { Range } from "react-date-range";
import DatePicker from "../form/Calendar"; 
import CustomButton from "../form/CustomButton";
import useSearchModal, { SearchQuery } from "../../hooks/useSearchModal";
import SelectCities, { SelectCityValue } from "../form/SelectCities";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [numGuests, setNumGuests] = useState<string>('0');
    const [numBedrooms, setNumBedrooms] = useState<string>('0');
    const [city, setCity] = useState<SelectCityValue>();
    const [numBathrooms, setNumBathrooms] = useState<string>('0');
    const [area, setArea] = useState<string>('0');
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);


    //
    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            city: city?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bedrooms: parseInt(numBedrooms),
            bathrooms: parseInt(numBathrooms),
            area: parseInt(area),
            category: ''
        }

        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }

    // Set Date range
    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout');
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details');
        }

        setDateRange(selection);
    }

    // Contents
    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
            <SelectCities
                value={city}
                onChange={(value) => setCity(value as SelectCityValue)}
            />

            <div className="mt-6 flex flex-row gap-4 justify-end">
                <CustomButton
                    label="Check in date ->"
                    onClick={() => searchModal.open('checkin')}
                    className="justify-end"
                />
            </div>
        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in?</h2>
            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Location"
                    onClick={() => searchModal.open('location')}
                />

                <div className="justify-end">
                    <CustomButton
                        label="Check out date ->"
                        onClick={() => searchModal.open('checkout')}
                        className="justify-end"
                    />
                </div>
            </div>
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check out?</h2>
            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Check in date"
                    onClick={() => searchModal.open('checkin')}
                />

                <CustomButton
                    label="Details ->"
                    onClick={() => searchModal.open('details')}
                    className="justify-end"
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>
            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of guests: </label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numGuests} 
                        placeholder="Number of guests..."
                        onChange={(e) => setNumGuests(e.target.value)} 
                        className="w-full h-10 px-4 outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                        />
                </div>

                <div className="space-y-4">
                    <label>Number of bedrooms:  </label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numBedrooms} 
                        placeholder="Number of bedrooms..."
                        onChange={(e) => setNumBedrooms(e.target.value)} 
                        className="w-full h-10 px-4 outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                        />
                </div>

                <div className="space-y-4">
                    <label>Number of bathrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numBathrooms} 
                        placeholder="Number of bathrooms..."
                        onChange={(e) => setNumBathrooms(e.target.value)} 
                        className="w-full h-10 px-4 outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                        />
                </div>

                <div className="space-y-4">
                    <label>Area:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={area} 
                        placeholder="Number of bathrooms..."
                        onChange={(e) => setArea(e.target.value)} 
                        className="w-full h-10 px-4 outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Check out date"
                    onClick={() => searchModal.open('checkout')}
                    
                />

                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                    className="justify-end"
                />
            </div>
        </>
    )

    if (searchModal.step == 'location') {
        content = contentLocation;
    } else if (searchModal.step == 'checkin') {
        content = contentCheckin;
    } else if (searchModal.step == 'checkout') {
        content = contentCheckout;
    } else if (searchModal.step == 'details') {
        content = contentDetails;
    }

    return (
        <Modal
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    )
}

export default SearchModal;