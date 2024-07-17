import React, { useState } from "react";
import H1Title from "../../Shared/H1Title";

import { TrashIcon } from '@heroicons/react/outline';


function BookingManagement() {
  
  const [ bookings, setBookings ] = useState([
    { id: 1, title: "villa", surface: 250, guests: 4, price: 2399 },
    { id: 2, title: "villa", surface: 250, guests: 4, price: 2399 },
    { id: 3, title: "villa", surface: 250, guests: 4, price: 2399 },
  ]);

  function removeBooking(appartment_id) {
    setBookings(currentBookings => currentBookings.filter(booking => appartment_id != booking.id))
  }

  return(

    <section className="p-8 w-full">
      { 
      bookings.length != 0 ? (
      <>
        <H1Title styling="text-black md:text-left text-center">
          <p>My Bookings</p>
        </H1Title>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-2 mt-8">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-4 border rounded-lg shadow-lg bg-white">
              <h3 className="text-xl font-semibold">{booking.title}</h3>
              <ul className="mt-2">
                <li><strong>Surface:</strong> {booking.surface} m²</li>
                <li><strong>Guests:</strong> {booking.guests}</li>
                <li><strong>Price:</strong> {booking.price} MAD per night</li>
                <li>
                  <button 
                    className="bg-red-500 hover:bg-red-400 duration-300 text-white p-1 mt-3 rounded-full"
                    onClick={() => removeBooking(booking.id)}  
                  >
                    <TrashIcon className="w-4 h-4"/>
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </>
      ) :
      (
        <div className="text-black text-[20px]">
          <h2>Looks like you haven't made any bookings yet. Explore our services and find what suits you best!</h2>
        </div>
      )
    }
    </section>
  )
}

export default BookingManagement;