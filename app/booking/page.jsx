"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function BookingPage() {
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  // Fetch availability and bookings
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

  // Filter out already booked slots for the selected date
  const selectedDaySlots =
    availability
      .find(item => item.date === selectedDate)?.slots
      .filter(slot =>
        !bookings.some(booking => booking.date === selectedDate && booking.time === slot)
      ) || [];

  const handleNext = () => {
    if (!selectedDate || !selectedSlot) return;
    router.push(`/service?date=${selectedDate}&slot=${selectedSlot}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Book Your Haircut</h1>

      {/* Date Selection */}
      <label className="font-semibold">Select a Date:</label>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded p-2 text-black bg-white"
      >
        <option value="">-- Choose a date --</option>
        {availability.map((item, index) => (
          <option key={index} value={item.date}>
            {item.date}
          </option>
        ))}
      </select>

      {/* Time Slot Selection */}
      {selectedDate && (
        <>
          <label className="font-semibold">Select a Time Slot:</label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="border rounded p-2 text-black bg-white"
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
                No available slots for this date
              </option>
            )}
          </select>
        </>
      )}

      {/* Next Button */}
      {selectedDate && selectedSlot && (
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Next
        </button>
      )}

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="mt-4 px-3 py-2 bg-red-600 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
