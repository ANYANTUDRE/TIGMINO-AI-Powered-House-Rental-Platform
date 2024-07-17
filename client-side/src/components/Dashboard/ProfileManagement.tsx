import React, { useState, useEffect } from "react";
import H1Title from "../../Shared/H1Title";
// import { UserIcon } from '@heroicons/react/solid';
import { getUserId } from "../../lib/actions";
import apiService from "../../services/apiService";
// import LoginBtnOptions from "../../Shared/LoginBtnOptions";
import { resetAuthCookies } from "../../lib/actions";
import { Link } from "react-router-dom";

const ProfileManagement = () => {
  const [landlord, setLandlord] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [avatar_url, setAvatar_url] = useState<string>('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // try to automatically put the id
        const userId = await getUserId();
        setUserId(userId);

        const landlord = await apiService.get(`/api/auth/${userId}`);
        setLandlord(landlord);
        setEmail(landlord.email);
        setUsername(landlord.username);
        setPhone(landlord.phone);
        setCity(landlord.city);
        setAvatar_url(landlord.avatar_url)
        setName(landlord.name)

        console.log("lanlord detail", landlord)
        
      } catch (error) {
        console.error('Error fetching landlord data:', error);
      }
    };

    fetchData();
  }, []); // Include id in the dependency array

  const submitLogout = async () => {
    resetAuthCookies();
  }
  
  return(
    <section className="h-full w-full flex flex-wrap-reverse gap-6 md:m-2 py-14 justify-center md:justify-between items-center md:p-8">
      <div className="basis-[45%] min-w-[300px] flex flex-col gap-4">
        <div>
          <H1Title styling="text-black md:text-left text-center">
            <p>Profile Details</p>
          </H1Title>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex bg-white justify-between py-2 px-5 rounded shadow-lg">
              <strong>Name</strong>
              <p>{name}</p>
            </div>
            <div className="flex bg-white justify-between py-2 px-5 rounded shadow-lg">
              <strong>Username</strong>
              <p>{username}</p>
            </div>
            <div className="flex bg-white justify-between py-2 px-5 rounded shadow-lg">
              <strong>City</strong>
              <p>{city}</p>
            </div>
          </div>
        </div>
        <div>
          <H1Title styling="text-black md:text-left text-center">
            <p>Contact Info</p>
          </H1Title>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex bg-white justify-between py-2 px-5 rounded shadow-lg">
              <strong>Phone</strong>
              <p>{phone}</p>
            </div>
            <div className="flex bg-white justify-between py-2 px-5 rounded shadow-lg">
              <strong>Email</strong>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="basis-[45%] min-w-[300px]">
        <div className="flex gap-4 items-center flex-col text-black">
        <div className="bg-white p-4 rounded-full shadow-lg w-[200px] h-[200px]">
            <img src={avatar_url} alt="user picture" className="w-full h-full object-cover rounded-full" />
        </div>

          <h2>{name}</h2>
          <button onClick={submitLogout}
            className="bg-red-500 hover:bg-red-400 duration-300 shadow-lg text-white font-bold px-5 rounded-md py-1"
          >
            <Link to={"/"}>
              Logout
            </Link>
          </button>


        </div>
      </div>
    </section>
  )
}

export default ProfileManagement;