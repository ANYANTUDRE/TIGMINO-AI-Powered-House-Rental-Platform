import useAddPropertyModal from "../../hooks/useAddPropertyModal";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddHomeWork } from "react-icons/md";

interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) => {
    const addPropertyModal = useAddPropertyModal();
    const navigate = useNavigate();
    
    const AddPropertyfromHome = () => {
        console.log("userId from AddPropertyButton -->", userId)
        if (userId) {
            addPropertyModal.open()
        } else {
            navigate("/signin");
        }
    }

    return (
        <div 
            onClick={AddPropertyfromHome}
            className="dark-brown font-bold hover:text-terracotta p-2 cursor-pointer rounded-full hover:bg-gray-200"
            style={{ borderWidth: '1px', borderColor: '' }}
        >
            <MdOutlineAddHomeWork style={{ fontSize: '22px' }} />
        </div>
    )
}

export default AddPropertyButton;
