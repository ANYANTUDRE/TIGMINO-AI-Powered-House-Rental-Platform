import React from "react";


function BookingCard() {

  return(
    <div className="bg-white rounded-md shadow-lg">
      <div className="p-6 flex flex-col gap-4">
        <h1 className="text-black font-bold">Reservation</h1>
        <div className=" flex flex-col gap-3 text-black border p-6 rounded-md">
          <div className="flex gap-2">
            <div className="flex flex-col border-r">
              <label htmlFor="">Check-in</label>
              <input className="outline-none" type="date" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Checkout</label>
                <input className="outline-none" type="date" />
              </div>
          </div>
          <hr />
          <div className="flex flex-col">
            <label htmlFor="">Geusts</label>
            <input className="outline-none" type="number" name="" id="" placeholder="1 Geuest"/>
          </div>
        </div>
        <button 
          className="bg-gradient-to-r from-coral to-indigo hover:bg-gradient-to-r hover:from-indigo hover:to-coral duration-500 px-4 py-2 rounded-md text-white font-bold">
          Book
        </button>
      </div>
    </div>
  )
}

export default BookingCard;