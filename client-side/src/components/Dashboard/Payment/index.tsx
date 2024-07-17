import React, { useState } from "react";

import { ExclamationIcon } from '@heroicons/react/solid';

import PaymentOptions from "./PaymentOptions.tsx";


function PaymentMethodes() {
  
  const hasPaymentMethod: boolean = false;

  return(
    <section className="md:p-8 py-12 w-full">
      { hasPaymentMethod ? (
        <div className="">
          {/* display the existed methods */}
          <div className="text-black">
            <p>Add Another Payment Method</p>
            <PaymentOptions />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-center md:justify-start items-center gap-2">
            <ExclamationIcon className="w-5 h-5 text-orange-400" />
            <h2 className="font-semibold text-black">Select a Payment Method</h2>
          </div>
          <PaymentOptions />
        </div>
      )}
    </section>
  )
}

export default PaymentMethodes;