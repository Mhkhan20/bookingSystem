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



  // Fetch availability and bookings from Firestore
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

  // Convert availability dates into JS Date objects
  const availableDates = availability.map(item => {
    const [year, month, day] = item.date.split('-');
    return new Date(year, month - 1, day); // month is zero-based
  });

  // Helper to check if a date should be enabled
  const isDateAvailable = (date) => {
    return availableDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
  };

  // Get selected date as string (yyyy-mm-dd) for comparison
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
      <h1>Book Your Haircut</h1>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedSlot("");  // Reset the time slot when date changes
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
            className="border rounded p-2 text-black bg-white"
            disabled={!selectedDate || selectedDaySlots.length === 0}
            style={{
              padding: "0.75em 1em",
              borderRadius: "10px",
              border: "2px solid #f0ebd8",
              backgroundColor: "#f0ebd8",
              color: "#000",
              fontSize: "1rem",
              width: "250px", // or whatever size you want
              cursor: "pointer"}}
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
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          style={{
            backgroundColor:
            selectedDate && selectedSlot ? "#f0ebd8" : "#aaa",
          }}
        >
          Next
        </button>
     </div>
          
    </div>
  );
}
