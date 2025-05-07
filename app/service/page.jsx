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
  const [detailedViewService, setDetailedViewService] = useState(null); 

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

  const handleCardToggleDetails = (service) => {
    if (selectedServiceName === service.name && detailedViewService === service.name) {
      setDetailedViewService(null);
    } else {
      
      setSelectedServiceName(service.name);
      setSelectedServicePrice(service.price);
      setDetailedViewService(service.name); 
    }
  };

  const handleConfirmSelectionAndCollapse = (serviceName) => {
    setDetailedViewService(null);
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
              ${detailedViewService === serviceItem.name && selectedServiceName === serviceItem.name ? "expanded" : ""}
            `}
            onClick={() => handleCardToggleDetails(serviceItem)}
          >
            <h3>{serviceItem.name}</h3>
            {detailedViewService === serviceItem.name && selectedServiceName === serviceItem.name && (
              <div className="serviceCardDetails">
                <p>Price: ${serviceItem.price.toFixed(2)}</p>
                <p>{serviceItem.description}</p>
                <button
                  className="confirmDetailsButton"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleConfirmSelectionAndCollapse(serviceItem.name);
                  }}
                >
                  Select
                </button>
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

          {/* need to add back button  */}
      </div>
      
    </div>
  );
}