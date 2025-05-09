"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import emailjs from "emailjs-com";
import { onAuthStateChanged } from "firebase/auth";
import BackButton from "../components/BackButton";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [hasExistingBooking, setHasExistingBooking] = useState(false);

  const fullAddress = "647 Kitchen Street Fredericton NB";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUserChecked(true);
  
      
        (async () => {
          const bookingsRef = collection(db, "bookings");
          const q = query(bookingsRef, where("userEmail", "==", currentUser.email));
          const snapshot = await getDocs(q);
  
          if (!snapshot.empty) {
            setHasExistingBooking(true);
            setMessage("You already have an active booking. Please cancel it to make a new one.");
          }
        })();
      }
    });
  
    return () => unsubscribe();
  }, []);
  


  const handleConfirm = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;

      await addDoc(collection(db, "bookings"), {
        userName: name,
        userEmail: user.email,
        date: date,
        time: slot,
        service: service,
        price: Number(price),
        createdAt: new Date().toISOString(),
      });

      emailjs
        .send(
          "service_6l1whcf",
          "template_adminID",
          {
            name: name,
            date: date,
            slot: slot,
            service: service,
            price: price,
            user_email: user.email,
          },
          "XRWZqqESFBPZAi8oB"
        )
        .then(() => {
          setMessage("Booking confirmed! Confirmation email sent.");
          setLoading(false);
          setConfirmed(true);
        })
        .catch(() => {
          setMessage("Booking confirmed, but failed to send email. Please contact me @ 506-230-9440");
          setLoading(false);
          setConfirmed(true);
        });

    } catch (error) {
      console.error("Error confirming booking:", error);
      setMessage(
        "There was a problem confirming your booking. Please try again."
      );
      setLoading(false);
    }
  };

  if (!userChecked) {
    return null;
  }

  return (
    
    <div className="confirmContainer"> 
     <BackButton />
      
      <div className="confirmCard">
    
    

    <h1>Confirm Your Booking</h1>

    <p><strong>Date:</strong> {date}</p>
    <p><strong>Time:</strong> {slot}</p>
    <p><strong>Service:</strong> {service}</p>
    <p><strong>Price:</strong> ${price}</p>
    <p><strong>Name:</strong> {name}</p>
    <p>
    <strong>Location:</strong> {fullAddress}{" "}
      <a
        href={mapUrl}
        style={{ color: "#000", textDecoration: "underline", marginLeft: "5px" }}
      >
      View on Map
      </a>
    </p>

    {loading ? (
  <div className="loadingProgress"> 
    <CircularProgress style={{ color: '#000' }} />
  </div>
) : !confirmed ? (
  <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    {!hasExistingBooking && ( 
      <button
      style={{
        padding: '.7em 3em',
        color: "#f0ebd8",
        backgroundColor: 'black',
        borderRadius: '6px',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
      onClick={handleConfirm}
    >
      Confirm Booking
    </button>
    )}
    
  </div>
) : null}
    
    {message && (
      <p>{message}</p>
    )}
  </div>
    </div>

   
  );
}
