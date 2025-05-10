"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const adminEmail = "q23da@unb.ca"; // ✅ Your admin email

  // 🔐 Auth check on load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email === adminEmail) {
        setAuthorized(true);
      } else {
        router.push("/login"); // ❌ Redirect if not admin
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  // ⏳ While checking auth
  if (checking) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <p>Checking admin access...</p>
      </div>
    );
  }

  // ✅ If authorized, render form
  if (!authorized) return null;

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
    
    <div className="adminContainer">
      <h1>Admin - Set Availability</h1>

      <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'2em', flexDirection:'column'}}> 
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <input
                type="text"
                value={timeSlots}
                onChange={(e) => setTimeSlots(e.target.value)}
                placeholder="Enter time slots (comma separated, e.g., 2pm, 3pm)"
                required
              />
              <button type="submit">
                Save Availability
              </button>
            </form>
      {message && <p>{message}</p>}
      </div>
     
    </div>
  );
}
