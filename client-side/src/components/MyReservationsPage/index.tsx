// import apiService from "../../services/apiService";
// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// const MyReservationsPage = () => {
//     const [reservations, setReservations] = useState(null);

//     useEffect(() => {
//         const fetchUserReservations = async () => {
//             try {
//                 const reservationsData = await apiService.get('/api/auth/myreservations/');
//                 setReservations(reservationsData);
//             } catch (error) {
//                 console.error('Error fetching reservations:', error);
//             }
//         };

//         fetchUserReservations();
//     }, []);

//     return (
//         <main className="max-w-[1500px] mx-auto px-6 pb-6">
//             <h1 className="my-6 text-2xl">My reservations</h1>

//             <div className="space-y-4">
//                 {reservations && reservations.map((reservation) => (
//                     <div key={reservation.id} className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
//                         <div className="col-span-1">
//                             <div className="relative overflow-hidden aspect-square rounded-xl">
//                                 <img
//                                     src={reservation.property.image_url}
//                                     className="hover:scale-110 object-cover transition h-full w-full"
//                                     alt="My House"
//                                 />
//                             </div>
//                         </div>

//                         <div className="col-span-1 md:col-span-3">
//                             <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

//                             <p className="mb-2"><strong>Check in date:</strong> {reservation.start_date}</p>
//                             <p className="mb-2"><strong>Check out date:</strong> {reservation.end_date}</p>

//                             <p className="mb-2"><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
//                             <p className="mb-2"><strong>Total price:</strong> ${reservation.total_price}</p>

//                             <Link
//                                 to={`/properties/${reservation.property.id}`}
//                                 className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl"
//                             >
//                                 Go to property
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </main>
//     );
// }

// export default MyReservationsPage;

import apiService from "../../services/apiService";
// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReservationCard from "./ReservationCard.tsx";
import H1Title from "../../Shared/H1Title";
import BackHomePageLink from "../../Shared/BackHomePageLink";
import LoadingSpinner from "../../Shared/LoadingSpinner";

interface ReservationProps {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: number;
  city: string;
  checkInDate: string;
  checkOutDate: string;
  hostName: string;
}

//type ReservationsData = ReservationProps[] | null;

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchUserReservations = async () => {
      try {
        const response = await apiService.get("/api/auth/myreservations/");
        setReservations(response);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchUserReservations();
    setLoading(false);
  }, []);

  return (
    <div className="relative w-full bg-beige-primary-bg mx-auto min-h-screen">
      <H1Title styling="text-black p-6">
        <p>
          My <span className="text-saffron">Reservations</span>
        </p>
      </H1Title>
      <div className="p-8 h-full flex flex-wrap gap-4 justify-center items-center ">
        {loading ? (
          <LoadingSpinner />
        ) : (
          reservations &&
          reservations.map((reservation) => (
            <ReservationCard
              id={reservation.property.id}
              title={reservation.title}
              image_url={reservation.property.image_url}
              price_per_night={reservation.total_price}
              endDate={reservation.end_date}
              startDate={reservation.start_date}
              guests={reservation.property.guests}
              area={reservation.property.area}
              city={reservation.property.city}
              is_favorite={false}
            />
          ))
        )}
      </div>
      <div className="absolute p-3 right-0 w-[270px] top-8">
        <BackHomePageLink />
      </div>
    </div>
  );
};

export default MyReservationsPage;

// <ReservationCard
//   key={reservation.id} // Make sure to add a unique key for each child in the list
//   id={reservation.id}
//   title={reservation.title}
//   image_url={reservation.image_url}
//   price_per_night={reservation.price_per_night}
//   bedrooms={reservation.bedrooms}
//   bathrooms={reservation.bathrooms}
//   guests={reservation.guests}
//   area={reservation.area}
//   city={reservation.city}
//   checkInDate={reservation.checkInDate}
//   checkOutDate={reservation.checkOutDate}
//   hostName={reservation.hostName}
// />
