"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BackButton from "../components/BackButton";

const servicesData = [
  { name: "Haircut", price: 18.5, description: "Classic haircut to your style." },
  { name: "Beard", price: 10, description: "Beard trimming and shaping." },
  { name: "Haircut and Beard", price: 23, description: "Haircut and beard combo." },
];

export default function ServicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const date = searchParams.get("date");
  const slot = searchParams.get("slot");

  const [userChecked, setUserChecked] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [detailedViewService, setDetailedViewService] = useState(null); // To track which card's details are shown

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUserChecked(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleCardClick = (service) => {
    // If the clicked card is already selected and its details are shown, just collapse it.
    if (selectedServiceName === service.name && detailedViewService === service.name) {
      setDetailedViewService(null); // Collapse details
    } else {
      // If it's a new selection or re-selecting a card whose details are hidden
      setSelectedServiceName(service.name);
      setSelectedServicePrice(service.price);
      setDetailedViewService(service.name); // Expand details for the new selection
    }
  };

  const handleNext = () => {
    if (!selectedServiceName || !bookingName) return;
    router.push(
      `/confirm?date=${date}&slot=${slot}&service=${selectedServiceName}&price=${selectedServicePrice}&name=${encodeURIComponent(
        bookingName
      )}`
    );
  };

  if (!userChecked) {
    return null;
  }

  return (
    <div className="serviceContainer">
      <BackButton />
      <h1>Select Your Service</h1>
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', gap: "2rem"}}>
        {date && <p><strong>Date:</strong> {date}</p>}
        {slot && <p><strong>Time Slot:</strong> {slot}</p>}
      </div>

      <div className="cardsContainer">
        {servicesData.map((serviceItem) => (
          <div
            key={serviceItem.name}
            className={`
              serviceCard
              ${selectedServiceName === serviceItem.name ? "selected" : ""}
              ${detailedViewService === serviceItem.name ? "expanded" : ""}
            `}
            onClick={() => handleCardClick(serviceItem)} // Changed handler
          >
            <h3>{serviceItem.name}</h3>
            {/* Show details if this service is the one for detailed view */}
            {detailedViewService === serviceItem.name && (
              <div className="serviceCardDetails">
                <p>Price: ${serviceItem.price.toFixed(2)}</p>
                <p>{serviceItem.description}</p>
                {/* "Select" button removed from here */}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{display:"flex", gap:'0.8rem', justifyContent:'center', marginTop:'20px'}}>
        <input
          type="text"
          value={bookingName}
          onChange={(e) => setBookingName(e.target.value)}
          placeholder="Enter your name"
          className="nameInput"
        />
        <button
          onClick={handleNext}
          disabled={!selectedServiceName || !bookingName}
          className="nextButton"
        >
          Next
        </button>
      </div>
    </div>
  );
}