import { useEffect } from "react";


function useSrollTop() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
}

export default useSrollTop;