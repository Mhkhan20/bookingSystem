"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import BackButton from "../components/BackButton";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import emailjs from "emailjs-com";

export default function CancelBookingPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCancel = async () => {
    setMessage(""); // clear any previous message

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userEmail", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      setMessage("No bookings found with this email.");
      return;
    }

    const bookingDoc = snapshot.docs[0]; 
    const booking = bookingDoc.data();
    const bookingId = bookingDoc.id;

    await deleteDoc(doc(db, "bookings", bookingId));

    setMessage("Your booking has been cancelled successfully. A confirmation email has been sent.");

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
      <BackButton />
      <div className='loginCard'>
        <h1>Cancel Your Booking</h1>

        <input
          type="email"
          placeholder="Enter your booking email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <button className="emailLogin" onClick={handleCancel}>
          Cancel Booking
        </button>

        {message && (
          <p style={{ marginTop: "1em", color: "#000", textAlign: "center" }}>
            {message}
          </p>
        )}

      </div>
    </div>
  );
}
