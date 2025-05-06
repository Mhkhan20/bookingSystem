"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import emailjs from "emailjs-com";

export default function CancelBookingPage() {
  const [email, setEmail] = useState("");


  const handleCancel = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userEmail", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      alert("No booking found for this email."); ///
      return;
    }

    const bookingDoc = snapshot.docs[0]; // In case there are multiple, take the first one.
    const booking = bookingDoc.data();
    const bookingId = bookingDoc.id;

    await deleteDoc(doc(db, "bookings", bookingId));

    alert("Your booking has been cancelled.");///

    // ✅ Send cancellation email to both customer and admin
    emailjs
      .send(
        "service_6l1whcf",
        "template_4x9qzhp",
        {
          user_email: email,
          name: booking.userName || "No name provided",  
          slot: booking.time,
          service: booking.service,
          date: booking.date
        },
        "XRWZqqESFBPZAi8oB"
      )
      .then(() => {
        console.log("Cancellation email sent to customer and admin.");
      })
      .catch((error) => {
        console.error("EmailJS cancellation email error:", error);
      });
  };

  return (
    <div className="container">
      <h1>Cancel Your Booking</h1>

      <input
        type="email"
        placeholder="Enter your booking email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />

      <button
        onClick={handleCancel}
      >
        Cancel Booking
      </button>

    </div>
  );
}
