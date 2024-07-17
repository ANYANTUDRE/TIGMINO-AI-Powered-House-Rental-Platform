import React from "react";
import NewListing from "./NewListing";
import ListingManagementPrime from "./DisplayHostListings";


function ListingManagement() {

  return(
    <section className="md:p-8 py-12 w-full h-full">
      {/* Section to add new listings */}
      <NewListing />
      {/* Section to display host's listings */}
      <ListingManagementPrime />
    </section>
  )
}


export default ListingManagement;