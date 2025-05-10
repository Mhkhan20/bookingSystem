"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminPage() {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slotsArray = timeSlots.split(",").map(slot => slot.trim());

    try {
      await addDoc(collection(db, "availability"), {
        date: date,
        slots: slotsArray
      });
      setMessage("Availability saved successfully!");
      setDate("");
      setTimeSlots("");
    } catch (error) {
      console.error("Error saving availability:", error);
      setMessage("Failed to save availability.");
    }
  };

  return (
      <div className="container">
          <h1 className="text-2xl font-bold">Admin - Set Availability</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          value={timeSlots}
          onChange={(e) => setTimeSlots(e.target.value)}
          placeholder="Enter time slots (comma separated, e.g., 2pm, 3pm)"
          className="border rounded p-2 w-80"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Availability
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
