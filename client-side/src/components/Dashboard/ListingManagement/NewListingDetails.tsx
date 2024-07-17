import React, { ChangeEvent, useState } from 'react';
import SelectCities, { SelectCityValue } from '../../form/SelectCities';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/apiService';


function NewListingDetails() {
  // States
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

  const [loading, setLoading] = useState(false);

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
  const submitForm = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);

    console.log('submitForm');

    if (
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

        try {
            const response = await apiService.post('/api/properties/create/', formData);
            console.log("data", formData)

            if (response.success) {
                console.log('SUCCESS :-D');
                navigate('/?added=true');
            } else {
                console.log('Error');

                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    return error.message; // Extract error message
                })

                setErrors(tmpErrors)
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors(['An unexpected error occurred. Please try again.']);
        }
    }
}


    return (
        <section className="md:p-8 py-12 w-full h-full">
          <form onSubmit={submitForm}>
            <div className="flex flex-wrap justify-between gap-4">
              <div className="basis-full md:basis-[48%]">
                <label htmlFor="imgFile" className="block">Apartment Image:</label>
                <input required 
                  type="file" 
                  id="imgFile" 
                  name="imgFile" 
                  onChange={setImage} 
                  className="w-full p-2 border rounded" 
                />

                <label htmlFor="title" className="block mt-4">Title:</label>
                <input required 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={dataTitle} 
                  onChange={(e) => setDataTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  />

                <label htmlFor="description" className="block mt-4">Description:</label>
                <textarea required
                  id="description" 
                  name="description" 
                  value={dataDescription}
                  onChange={(e) => setDataDescription(e.target.value)} 
                  className="w-full p-2 border rounded"  
                />

                <label htmlFor="price" className="block mt-4">Price per night (MAD):</label>
                <input required
                  type="number" 
                  id="price" 
                  name="price" 
                  value={dataPrice}
                  onChange={(e) => setDataPrice(e.target.value)}
                  className="w-full p-2 border rounded"  
                />
              </div>

              <div className="basis-full md:basis-[48%]">
                <label htmlFor="city" className="block">City:</label>
                <div className='pt-3 pb-6 space-y-4'>
                    <SelectCities 
                        value={dataCity}
                        onChange={(value) => setDataCity(value as SelectCityValue)}
                    />

                </div>

                <label htmlFor="nbrGuests" className="block mt-4">Number of Guests:</label>
                <input required
                  type="number" 
                  id="nbrGuests" 
                  name="nbrGuests" 
                  value={dataGuests}
                  onChange={(e) => setDataGuests(e.target.value)}
                  className="w-full p-2 border rounded"  
                />

                <label htmlFor="nbrBedrooms" className="block mt-4">Number of Bedrooms:</label>
                <input required
                  type="number" 
                  id="nbrBedrooms" 
                  name="nbrBedrooms" 
                  value={dataBedrooms}
                  onChange={(e) => setDataBedrooms(e.target.value)}
                  className="w-full p-2 border rounded" 
                />

                <label htmlFor="surface" className="block mt-4">Surface (m²):</label>
                <input required
                  type="number" 
                  id="surface" 
                  name="surface" 
                  value={dataArea}
                  onChange={(e) => setDataArea(e.target.value)}
                  className="w-full p-2 border rounded"  
                />

                <label htmlFor="nbrBathrooms" className="block mt-4">Number of Bathrooms:</label>
                <input required
                  type="number" 
                  id="nbrBathrooms" 
                  name="nbrBathrooms" 
                  value={dataBathrooms}
                  onChange={(e) => setDataBathrooms(e.target.value)}
                  className="w-full p-2 border rounded"
                />

              {errors.map((error, index) => {
                return (
                    <div 
                        key={`error_${index}`}
                        className="p-5 text-white rounded-xl opacity-80"
                    >
                        {error}
                    </div>
                )
            })}
              </div>
            </div>
              <button 
                onClick={submitForm}
                type="submit" 
                className="mt-8 bg-saffron text-black hover:text-white duration-300 font-bold py-2 px-4 rounded hover:bg-gray-800">
                  {loading ? "Loading..." : "Add Apartment"}
              </button>
          </form>
        </section>
    );
}

export default NewListingDetails;
