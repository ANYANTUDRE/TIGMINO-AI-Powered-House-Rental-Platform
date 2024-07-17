import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";

import H1Title from "../../../Shared/H1Title";
import NewListingDetails from "./NewListingDetails";

function NewListing() {

  const [ addNewListing, setAddNewListing] = useState<boolean>(false);

  return(
    <section className="w-full">
      <div>
        
        <H1Title styling="text-black md:text-left text-center mb-4">
          <p>Add New Listing</p>
        </H1Title>
        { !addNewListing ? (
          <button
            className="flex gap-2 items-center text-white font-semibold px-4 py-2 rounded-md bg-terracotta hover:bg-black duration-300"
            onClick={() => setAddNewListing(true)}
          >
            <PlusIcon className="w-4 h-4 text-saffron" />
            Add New
          </button>
        ) :
        (
          <NewListingDetails />
        )
        }
      </div>

    </section>
  )
}


export default NewListing;