import { useEffect, useState } from 'react';
import ApartmentCard from './ApartmentCard';
import apiService from "../services/apiService";
import { motion } from "framer-motion";
import { Animation } from './Animations';
import useSearchModal from '../hooks/useSearchModal';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import React from 'react';


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;

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

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

function ApartmentsList({
    landlord_id,
    favorites
}: PropertyListProps) {
    const params = useSearchParams();
    console.log("params -->", params)  // debugging

    const searchModal = useSearchModal();
    const numGuests = searchModal.query.guests;
    const numBathrooms = searchModal.query.bathrooms;
    const numBedrooms = searchModal.query.bedrooms;
    const checkinDate = searchModal.query.checkIn;
    const checkoutDate = searchModal.query.checkOut;
    const category = searchModal.query.category;
    const city = searchModal.query.city;
    const area = searchModal.query.area;
    const [properties, setProperties] = useState<PropertyType[]>([]);

    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id === id) {
                property.is_favorite = is_favorite;

                if (is_favorite) {
                    console.log('added to list of favorited properties');
                } else {
                    console.log('removed from list');
                }
            }

            return property;
        });

        setProperties(tmpProperties);
    };

    const getProperties = async () => {
        let url = '/api/properties/';

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`;
        } else if (favorites) {
            url += '?is_favorites=true';
        } else {
            let urlQuery = '';

            if (city) {
                urlQuery += '&country=' + city;
            }

            if (area) {
                urlQuery += '&area=' + area;
            }

            if (numGuests) {
                urlQuery += '&numGuests=' + numGuests;
            }            

            if (numBedrooms) {
                urlQuery += '&numBedrooms=' + numBedrooms;
            }

            if (numBathrooms) {
                urlQuery += '&numBathrooms=' + numBathrooms;
            }

            if (category) {
                urlQuery += '&category=' + category;
            }

            if (checkinDate) {
                urlQuery += '&checkin=' + format(checkinDate, 'yyyy-MM-dd');
            }
            if (checkoutDate) {
                urlQuery += '&checkout=' + format(checkoutDate, 'yyyy-MM-dd');
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery);

                urlQuery = '?' + urlQuery.substring(1);

                url += urlQuery;
            }
        }
        console.log('url -->', url);

        try {
            const tmpProperties = await apiService.get(url);
            setProperties(
                tmpProperties.data.map((property: PropertyType) => {
                    if (tmpProperties.favorites.includes(property.id)) {
                        property.is_favorite = true;
                    } else {
                        property.is_favorite = false;
                    }

                    return property;
                })
            );
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    useEffect(() => {
        getProperties();
    }, [category, searchModal.query]);
    

    return (

        <div className='flex flex-wrap gap-6 justify-center items-center mt-6'>
            {properties.map((property) => (
                <motion.div
                    initial={Animation.initial}
                    whileInView={Animation.whileInView}
                    viewport={Animation.viewport}
                    transition={{ transition: 0.3, delay: 0.1 }}
                    variants={Animation.variants}
                    key={property.id}
                >
                    <ApartmentCard
                        property={property}
                        markFavorite={(is_favorite: any) =>
                            markFavorite(property.id, is_favorite)
                        }
                    />
                </motion.div>
            ))}
        </div>
    );
}

export default ApartmentsList;
