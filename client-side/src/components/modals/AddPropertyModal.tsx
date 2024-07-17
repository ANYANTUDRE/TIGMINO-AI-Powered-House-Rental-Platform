import useAddPropertyModal from '../../hooks/useAddPropertyModal';
import React, { ChangeEvent, useState } from 'react';
import Modal from './Modal';
import Categories from '../addproperty/Categories';
import SelectCities, { SelectCityValue } from '../form/SelectCities';
import apiService from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../form/CustomButton';


const AddPropertyModal = () => {

    // States
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataArea, setDataArea] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');
    const [dataCity, setDataCity] = useState<SelectCityValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);

    //
    const addPropertyModal = useAddPropertyModal();
    const navigate = useNavigate();

   
    // Set datas
    const setCategory = (category: string) => {
        setDataCategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    }

  
    // Submit
    const submitForm = async () => {
        console.log('submitForm');

        if (
            dataCategory &&
            dataTitle &&
            dataDescription &&
            dataPrice &&
            dataArea &&
            dataCity &&
            dataImage
        ) {
            const formData = new FormData();
            formData.append('category', dataCategory);
            formData.append('title', dataTitle);
            formData.append('description', dataDescription);
            formData.append('price_per_night', dataPrice);
            formData.append('area', dataArea);
            formData.append('bedrooms', dataBedrooms);
            formData.append('bathrooms', dataBathrooms);
            formData.append('guests', dataGuests);
            formData.append('city', dataCity.label);
            formData.append('image', dataImage);

            const response = await apiService.post('/api/properties/create/', formData);

            if (response.success) {
                console.log('SUCCESS :-D');
                navigate('/?added=true');
                addPropertyModal.close();
            } else {
                console.log('Error while posting property');
                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    return error;
                })
                setErrors(tmpErrors)
            }
        }
    }

    //
    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className='mb-1 font-bold text-center text-xl'>Choose category</h2>

                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category) => setCategory(category)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(2)}
                    />
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className='mb-2 font-bold text-center text-xl'>Describe your place</h2>

                    <div className='pt-2 pb-2 space-y-2'>
                        <div className='flex flex-col space-y-1'>
                            <label>Title</label>
                            <input
                                type="text"
                                value={dataTitle}
                                onChange={(e) => setDataTitle(e.target.value)}
                                className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                                />
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label>Description</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className="w-full h-[150px] outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-xl"

                            ></textarea>
                        </div>
                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(1)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(3)}
                    />
                </>
            ) : currentStep == 3 ? (
                <>
                    <h2 className='mb-0 mt-0 font-bold text-center text-xl'>Details</h2>

                    <div className='pt-0 pb-2 space-y-1'>
                        <div className='flex flex-col space-y-1'>
                            <label>Price per night</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e) => setDataPrice(e.target.value)}
                                className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                                />
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label>Area</label>
                            <input
                                type="number"
                                value={dataArea}
                                onChange={(e) => setDataArea(e.target.value)}
                                className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                                />
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label>Bedrooms</label>
                            <input
                                type="number"
                                value={dataBedrooms}
                                onChange={(e) => setDataBedrooms(e.target.value)}
                                className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                                />
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label>Bathrooms</label>
                            <input
                                type="number"
                                value={dataBathrooms}
                                onChange={(e) => setDataBathrooms(e.target.value)}
                                className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                                />
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label>Maximum number of guests</label>
                            <input
                                type="number"
                                value={dataGuests}
                                onChange={(e) => setDataGuests(e.target.value)}
                                className="outline-none bg-beige-primary-bg py-2 px-4 border border-saffron rounded-full"
                                />
                        </div>
                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-1 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(2)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(4)}
                    />
                </>
            ) : currentStep == 4 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Location</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <SelectCities 
                            value={dataCity}
                            onChange={(value) => setDataCity(value as SelectCityValue)}
                        />
                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(3)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(5)}
                    />
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-2xl'>Image</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={setImage}
                            />
                        </div>

                        {dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <img src={URL.createObjectURL(dataImage)} alt="Uploaded image" />
                            </div>
                        )}
                    </div>

                    {errors.map((error, index) => {
                        return (
                            <div
                                key={index}
                                className='p-5 mb-4 bg-red-700 text-white rounded-xl opacity-80'
                            >
                                {error}
                            </div>
                        )
                    })}

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(4)}
                    />

                    <CustomButton
                        label='Submit'
                        onClick={submitForm}
                    />
                </>
            )}
        </>
    )

    return (
        <>
            <Modal
                isOpen={addPropertyModal.isOpen}
                close={addPropertyModal.close}
                label="Add property"
                content={content}
            />
        </>
    )
}

export default AddPropertyModal;