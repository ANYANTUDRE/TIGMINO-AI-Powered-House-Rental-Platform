import React, { useCallback, useEffect, useState } from "react";

interface ModalProps {
    label: string;
    close: () => void;
    content: React.ReactElement;
    isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
    label,
    content,
    isOpen,
    close
}) => {
    
    const handleClose = useCallback(() => {
        setTimeout(() => {
            close();
        }, 300)
    }, [close])

    if (!isOpen) {
        return null;
    }

    return (
        <div className="flex items-center justify-center fixed inset-0 z-50 h-auto bg-black/60">
            <div className="relative w-[70%] md:w-[60%] lg:w-[700px] my-6 mx-auto h-auto">
                <div className={`translate duration-600 h-full ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-10'}`}>
                    <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">

                        <header className="h-[70px] flex items-center p-6 rounded-t justify-center relative border-b">
                            <div 
                                onClick={handleClose}
                                className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                            >
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                        
                            <h2 className="text-lg font-bold">{label}</h2>
                        </header>

                        <section className="p-6 overflow-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}> {/* Add these lines */}
                            {content}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
