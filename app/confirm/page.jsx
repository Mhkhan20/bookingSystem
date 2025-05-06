"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";
import { onAuthStateChanged } from "firebase/auth";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const slot = searchParams.get("slot");
  const service = searchParams.get("service");
  const price = searchParams.get("price");

  const [message, setMessage] = useState("");

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


  const handleConfirm = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setMessage("Please log in before booking.");
        return;
      }

      // ✅ Step 1: Save booking to Firestore
      await addDoc(collection(db, "bookings"), {
        userName: name,
        userEmail: user.email,
        date: date,
        time: slot,
        service: service,
        price: Number(price),
        createdAt: new Date().toISOString()
      });

      // ✅ Step 2: Send a single email to both customer and admin
      emailjs
        .send(
          "service_6l1whcf",
          "template_adminID",   // Your single template for booking confirmation
          {
            name: name,
            date: date,
            slot: slot,
            service: service,
            price: price,
            user_email: user.email    // ✅ Send user email as variable
          },
          "XRWZqqESFBPZAi8oB"
        )
        .then(() => {
          console.log("Booking confirmation email sent to customer and admin.");
          setMessage("Booking confirmed! Confirmation email sent.");
        })
        .catch((error) => {
          console.error("EmailJS email error:", error);
          setMessage("Booking confirmed, but failed to send email.");
        });

    } catch (error) {
      console.error("Error confirming booking:", error);
      setMessage("There was a problem confirming your booking. Please try again.");
    }
  };

  if (!userChecked) {
    return null;  
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Confirm Your Booking</h1>

      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time Slot:</strong> {slot}</p>
      <p><strong>Service:</strong> {service}</p>
      <p><strong>Price:</strong> ${price}</p>

      <button
        onClick={handleConfirm}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Confirm Booking
      </button>

      {message && (
        <p className="mt-4 text-green-400 text-center">{message}</p>
      )}

      <button
        onClick={() => router.back()}
        className="px-3 py-1 bg-gray-500 text-white rounded"
      >
        Back
      </button>
    </div>
  );
}
