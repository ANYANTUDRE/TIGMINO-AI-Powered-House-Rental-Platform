import apiService from "../services/apiService.ts";
import { format } from "date-fns";

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
};

interface PropertyListProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
  query: {
    guests?: number;
    bathrooms?: number;
    bedrooms?: number;
    checkIn?: Date;
    checkOut?: Date;
    category?: string;
    city?: string;
    area?: number;
  };
}

export async function retrieveProperties({
  landlord_id,
  favorites,
  query
}: PropertyListProps): Promise<PropertyType[]> {
  const {
    guests: numGuests,
    bathrooms: numBathrooms,
    bedrooms: numBedrooms,
    checkIn: checkinDate,
    checkOut: checkoutDate,
    category,
    city,
    area,
  } = query;

  let url = "/api/properties/";

  if (landlord_id) {
    url += `?landlord_id=${landlord_id}`;
  } else if (favorites) {
    url += "?is_favorites=true";
  } else {
    let urlQuery = "";

    if (city) {
      urlQuery += "&country=" + city;
    }

    if (area) {
      urlQuery += "&area=" + area;
    }

    if (numGuests) {
      urlQuery += "&numGuests=" + numGuests;
    }

    if (numBedrooms) {
      urlQuery += "&numBedrooms=" + numBedrooms;
    }

    if (numBathrooms) {
      urlQuery += "&numBathrooms=" + numBathrooms;
    }

    if (category) {
      urlQuery += "&category=" + category;
    }

    if (checkinDate) {
      urlQuery += "&checkin=" + format(checkinDate, "yyyy-MM-dd");
    }
    if (checkoutDate) {
      urlQuery += "&checkout=" + format(checkoutDate, "yyyy-MM-dd");
    }

    if (urlQuery.length) {
      console.log("Query:", urlQuery);

      urlQuery = "?" + urlQuery.substring(1);

      url += urlQuery;
    }
  }
  console.log("url -->", url);

  try {
    const tmpProperties = await apiService.get(url);
    return tmpProperties.data.map((property: PropertyType) => {
      if (tmpProperties.favorites.includes(property.id)) {
        property.is_favorite = true;
      } else {
        property.is_favorite = false;
      }

      return property;
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}
