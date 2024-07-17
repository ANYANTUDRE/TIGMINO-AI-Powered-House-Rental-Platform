import React from "react";

interface CustomButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick
}) => {
    return (
        <div 
            onClick={onClick}
            className={`bg-saffron text-center cursor-pointer font-bold hover:bg-amber-500 duration-300 text-white py-2 px-4 border border-saffron rounded-full ${className}`}
        >
            {label}
        </div>
    )
}

export default CustomButton;