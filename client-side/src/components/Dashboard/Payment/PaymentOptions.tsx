import React, { useState } from "react";

import paypal from "../../../assets/paypal.svg";
import mastercard from "../../../assets/mastercard.svg";
import visacard from "../../../assets/visacard.svg";

function PaymentOptions() {

  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return(
    <div className="flex justify-center">
      <div className="text-black w-full md:w-[80%] m-4 gap-2 flex flex-col">

        <div className="flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-lg  cursor-pointer">
          <div className="flex gap-3 font-bold">
            <input 
              type="radio" 
              name="paypal" 
              id="paypal"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={handlePaymentChange}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <img className="w-4 h-4" src={paypal} alt="paypal icon" />
        </div>
        {/* paypal fields */}
        {
          paymentMethod === "paypal" &&
        <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md shadow-lg">
          <div className="">
            <input 
              className="bg-transparent outline-none border-b-2" 
              placeholder="Email Address" 
              type="email" 
              name="paypalemail" 
              id="paypalemail" 
              required 
              title="Enter PayPal Eamil Address"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-terracotta text-white rounded-md w-[100px] mt-4 hover:bg-red-500 duration-500">Submit</button>
        </div>
        }

        <div className="flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-lg cursor-pointer">
          <div className="flex gap-3 font-bold">
            <input 
              type="radio" 
              name="paypal" 
              id="bankcard" 
              value="bankcard"
              checked={paymentMethod === 'bankcard'}
              onChange={handlePaymentChange}
            />
            <label htmlFor="bankcard">Bank Card</label>
          </div>
          <div className="flex gap-2">
            <img className="w-5 h-5" src={mastercard} alt="bank card icon" />
            <img className="w-5 h-5" src={visacard} alt="bank card icon" />
          </div>
        </div>
        {/* card fields */}
        { paymentMethod == "bankcard" &&
        <div className="flex gap-8 items-center bg-gray-100 p-4 rounded-md shadow-lg">
          
          <div className="flex flex-col gap-6 font-semibold w-full px-4">
            <input className="bg-transparent outline-none border-b-2" placeholder="Name" type="text" name="name" id="holdername" required />
            <input 
              className="bg-transparent outline-none border-b-2" 
              placeholder="Card Number" 
              type="text" 
              name="cardnumber" 
              id="cardnumber" 
              required 
              pattern="\d{4} \d{4} \d{4} \d{4}" 
              title="Enter a 16-digit card number formatted as XXXX XXXX XXXX XXXX"
            />
            <div className="flex gap-12 w-full justify-between">
              <div className="flex-1">
                <input 
                  className="bg-transparent outline-none border-b-2 w-full" 
                  type="text" 
                  name="expirydate" 
                  id="expirydate" 
                  placeholder="MM/YY" 
                  required 
                  pattern="(0[1-9]|1[0-2])/[0-9]{2}" 
                  title="Enter a date in the format MM/YY"
                />
              </div>
              <div className="flex-1">
                <input 
                  className="bg-transparent outline-none border-b-2 w-full" 
                  type="text" 
                  name="cvvcode" 
                  id="cvvcode" 
                  placeholder="CVV Code" 
                  required 
                  pattern="\d{3}" 
                  title="Enter a 3-digit CVV code"
                />
              </div>
            </div>
            <button type="submit" className="px-4 py-2 bg-terracotta text-white rounded-md w-[100px] mt-4 hover:bg-red-500 duration-500">Submit</button>
          </div>
          {/* displaying card infos */}

          {/* <div className="">
            card
          </div> */}
        </div>
        }
      </div>
    </div>
  )
}

export default PaymentOptions;