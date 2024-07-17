import React, { useState } from 'react';
import H1Title from "../../Shared/H1Title";
import { UserIcon } from '@heroicons/react/solid';

interface FormData {
  name: string;
  username: string;
  city: string;
  phone: string;
  email: string;
  profileImage: string | null;
}

function ProfileEdit() {
  const [formData, setFormData] = useState<FormData>({
    name: 'Brahim El Harche',
    username: 'Belharche',
    city: 'Agadir',
    phone: '060000000',
    email: 'brahim@gmail.com',
    profileImage: null
  });

  // Handle changes in text inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle image file changes
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Updated Profile:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <section className="h-full w-full flex flex-wrap-reverse gap-6 md:m-2 py-14 justify-center md:justify-between items-center md:p-8">
      <form className="basis-[45%] min-w-[300px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <H1Title styling="text-black md:text-left text-center">
            <p>Edit Profile</p>
          </H1Title>
          <div className="flex flex-col gap-2 mt-2">
            {/* Text Inputs */}
            <input 
              type="text" 
              className="bg-white py-2 px-5 rounded shadow-md outline-none" 
              name="name" value={formData.name} 
              onChange={handleChange} />
            <input 
              type="text" 
              className="bg-white py-2 px-5 rounded shadow-md outline-none" 
              name="username" value={formData.username} 
              onChange={handleChange} />
            <input 
              type="text" 
              className="bg-white py-2 px-5 rounded shadow-md outline-none" 
              name="city" value={formData.city} 
              onChange={handleChange} />
            <input 
              type="text" 
              className="bg-white py-2 px-5 rounded shadow-md outline-none" 
              name="phone" value={formData.phone} 
              onChange={handleChange} />
            <input 
              type="email" 
              className="bg-white py-2 px-5 rounded shadow-md outline-none" 
              name="email" value={formData.email} 
              onChange={handleChange} />
            <label className='text-black font-semibold'>Upload your image</label>
            <input 
              type="file" className="bg-white py-2 px-5 rounded shadow-md outline-none" 
              onChange={handleImageChange} />
          </div>
        </div>
        <button type="submit" className="bg-terracotta hover:bg-dark-brown duration-300 shadow-lg text-white font-bold px-5 rounded-md py-2 mt-4">
          Save Changes
        </button>
      </form>
      <div className="basis-[45%] min-w-[300px]">
        <div className="flex gap-4 items-center flex-col text-black">
          <div className="bg-white p-10 rounded-full shadow-lg">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="Profile" className="w-40 h-40 rounded-full shadow-lg" />
            ) : (
              <UserIcon className="w-20 h-20" />
            )}
          </div>
          <h2>Edit Your Information</h2>
          <p>Update your profile details including your image below.</p>
        </div>
      </div>
    </section>
  );
}

export default ProfileEdit;
