import React from 'react';
// import Logo from "../assets/logo-tigmino.png";


function LoadingSpinner() {

  return(
    <div className="flex items-center justify-center min-h-screen bg-beige-primary-bg">
      <div className="flex space-x-2">
        <div className="w-2.5 h-2.5 bg-terracotta rounded-full animate-bounce"></div>
        <div className="w-2.5 h-2.5 bg-terracotta rounded-full animate-bounce delay-150"></div>
        <div className="w-2.5 h-2.5 bg-terracotta rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner;