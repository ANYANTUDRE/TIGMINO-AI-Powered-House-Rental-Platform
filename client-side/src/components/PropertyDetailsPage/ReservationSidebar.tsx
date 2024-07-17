import {useState, useEffect} from 'react';
import {Range} from 'react-date-range';
import { differenceInDays, eachDayOfInterval, format} from 'date-fns';
import DatePicker from '../form/Calendar';
import apiService from '../../services/apiService';
import React from 'react';
import { useNavigate } from "react-router-dom";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Property ={
    id: string;
    guests: number;
    price_per_night: number;
}

interface ReservationSidebarProps {
    userId: string | null,
    property: Property
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,
    userId
}) => {

    const navigate = useNavigate();

    const [isBooked, setIsBooked] = useState<boolean>(false);

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const [guests, setGuests] = useState<string>('1');
    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)

    const performBooking = async () => {
        console.log('performBooking', userId);

        if (userId) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('guests', guests);
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights', nights.toString());
                formData.append('total_price', totalPrice.toString());

                const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);

                if (response.success) {
                    console.log('Bookin successful')
                    setIsBooked(true);
                } else {
                    console.log('Something went wrong...');
                }
            }
        } else {
            navigate("/signin");
        }
    }

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        })
    }

    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date)
            });

            dates = [...dates, ...range];
        })

        setBookedDates(dates);
    }

    useEffect(() => {
        getReservations();
        
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;

                setFee(_fee);
                setTotalPrice((dayCount * property.price_per_night) + _fee);
                setNights(dayCount);
            } else {
                const _fee = (property.price_per_night / 100) * 5;

                setFee(_fee);
                setTotalPrice(property.price_per_night + _fee);
                setNights(1);
            }
        }
    }, [dateRange])

    return (
        <aside className="p-4 rounded-xl border border-saffron shadow-xl bg-white w-[360px]">
            <div className="">
            <h2 className="mb-5 text-2xl text-black font-semibold">${property.price_per_night} per night</h2>

            <DatePicker
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mb-6 p-3 border border-saffron rounded-xl">
                <label className="mb-2 text-black block font-bold text-xs">Guests</label>
                <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full -ml-1 text-xm"
                >
                    {guestsRange.map(number => (
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>
            </div>
            </div>

            <div className="">

            <div className="mb-4 flex justify-between align-center text-black">
                <p>{property.price_per_night} MAD * {nights} nights</p>

                <p>{property.price_per_night * nights} MAD</p>
            </div>

            <div className="mb-4 flex justify-between text-black align-center">
                <p>TIGMINO fee</p>

                <p>{fee} MAD</p>
            </div>

            <hr className='border-saffron' />

            <div className="mt-4 flex justify-between align-center font-boldn text-black">
                <p>Total</p>

                <p>{totalPrice} MAD</p>
            </div>

            <div 
                onClick={performBooking}
                className="cursor-pointer text-center mt-4 bg-gradient-to-r from-coral to-indigo hover:bg-gradient-to-r hover:from-indigo hover:to-coral duration-500 px-4 py-2 rounded-md text-white font-bold">
                Book
            </div>
            </div>
            { isBooked &&
                <div className="p-4 bg-white mt-2 flex justify-center font-semibold rounded text-saffron">
                    booked with success
                </div>
            }
        </aside>
    )
}

export default ReservationSidebar;