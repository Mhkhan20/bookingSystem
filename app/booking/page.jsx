"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';




export default function BookingPage() {
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedSlot, setSelectedSlot] = useState("");
  const router = useRouter();

  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUserChecked(true);  
      }
    });
    return () => unsubscribe();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      const availabilitySnapshot = await getDocs(collection(db, "availability"));
      const availabilityData = availabilitySnapshot.docs.map(doc => doc.data());
      setAvailability(availabilityData);

      const bookingsSnapshot = await getDocs(collection(db, "bookings"));
      const bookingsData = bookingsSnapshot.docs.map(doc => doc.data());
      setBookings(bookingsData);
    };

    fetchData();
  }, []);

 

const isDateAvailable = (date) => {
  const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

 
  const availabilityForDate = availability.find(item => item.date === dateString);
  if (!availabilityForDate) return false;

  
  const unbookedSlots = availabilityForDate.slots.filter(slot =>
    !bookings.some(booking => booking.date === dateString && booking.time === slot)
  );

  return unbookedSlots.length > 0;
};

  const selectedDateString = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : "";

  // Get available slots for the selected date
  const selectedDaySlots =
    availability
      .find(item => item.date === selectedDateString)?.slots
      .filter(slot =>
        !bookings.some(booking => booking.date === selectedDateString && booking.time === slot)
      ) || [];

  const handleNext = () => {
    if (!selectedDate || !selectedSlot) return;
    router.push(`/service?date=${selectedDateString}&slot=${selectedSlot}`);
  };

  if (!userChecked) {
    return null; // Or a loading spinner if you want
}


  return (
    <div className="bookingContainer">
       <img
          onClick={() => router.push('/welcome')}
          src='/backArr.png'
          className='backArrowBtn'
       />

      

      
      <h1>Book Your Haircut</h1>



      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedSlot("");  
        }}
          shouldDisableDate={(date) => !isDateAvailable(date)}
          slotProps={{
            textField: {
              variant: "outlined",
              sx: { bgcolor: "white", borderRadius: "px", display: "none" } // Hide the "cancel ok" (input box)
            }
          }}
        />
      </LocalizationProvider>

     
     <div style={{display:'flex', flexDirection:'row', gap:".75em"}}> 
     <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="dropDownLabel"
            disabled={!selectedDate || selectedDaySlots.length === 0}
          >
            <option value="">-- Choose a time slot --</option>
            {selectedDaySlots.length > 0 ? (
              selectedDaySlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Please select a Date
              </option>
            )}
          </select>

    
      
        <button
          onClick={handleNext}
          disabled = {!selectedDate || !selectedSlot}
          style={{
            backgroundColor:
            selectedDate && selectedSlot ? "#f0ebd8" : "#aaa",
            transition:' background-color 0.3s ease, transform 0.2s ease'
          }}
        >
          Next
        </button>
     </div>
          
    </div>
  );
}
