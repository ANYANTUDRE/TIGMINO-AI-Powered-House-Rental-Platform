import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactButton from "../PropertyDetailsPage/ContactButton";
import ApartmentList from "../../Shared/ApartmentsList";
import apiService from "../../services/apiService";
import { getUserId } from "../../lib/actions";


const LandlordDetailPage: React.FC = () => {
    const { landlordId } = useParams(); // Specify type for useParams
    const [landlord, setLandlord] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [avatar_url, setAvatar_url] = useState<string>('');
    
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("landord id ==>", landlordId)
                if (landlordId) { // Check if landlordId is defined
                    console.log("landord id ==>", landlordId)
                    const fetchedLandlord = await apiService.get(`/api/auth/${landlordId}`);
                    setLandlord(fetchedLandlord);

                    setAvatar_url(fetchedLandlord.avatar_url)
                    setName(fetchedLandlord.name)
                    console.log("landord himself==>", fetchedLandlord)

                    const fetchedUserId = await getUserId();
                    console.log("fetchedUserId==>", fetchedUserId)
                    setUserId(fetchedUserId);
                }
            } catch (error) {
                console.error('Error fetching landlord data:', error);
            }
        };

        fetchData();
    }, [landlordId]);


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            {landlord && landlordId && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <aside className="col-span-1 mb-4">
                        <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                            <img
                                src={avatar_url}
                                alt="Landlord name"
                                className="rounded-full"
                                style={{ width: 200, height: 200 }}
                            />
                            <h1 className="mt-6 text-2xl">{name}</h1>
                            
                            {userId !== landlordId && (
                                <ContactButton
                                    userId={userId}
                                    landlordId={landlordId}
                                />
                            )}

                        </div>
                    </aside>
                    <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ApartmentList 
                                landlord_id={landlordId} />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default LandlordDetailPage;
