import React from "react";
import { Link } from "react-router-dom";


function BackHomePageLink() {

  return(
    <Link to={"/"} className="text-black underline absolute bottom-4 left-4">{"<-"} Get back to the Home page</Link>
  )
}

export default BackHomePageLink;