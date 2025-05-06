"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";



export default function ServicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const date = searchParams.get("date");
  const slot = searchParams.get("slot");

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

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState(0);

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    setService(selectedService);

    // Set prices
    if (selectedService === "Haircut") setPrice(18.5);
    else if (selectedService === "Beard") setPrice(10);
    else if (selectedService === "Both") setPrice(23);
    else setPrice(0);
  };

  const handleNext = () => {
    if (!service || !name) return; // ✅ Don't allow next without name and service
    router.push(
      `/confirm?date=${date}&slot=${slot}&service=${service}&price=${price}&name=${encodeURIComponent(
        name
      )}`
    );
  };

  if (!userChecked) {
    return null; 
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Select Your Service</h1>

      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Time Slot:</strong> {slot}
      </p>

      {/* Service Selection */}
      <label className="font-semibold">Choose a Service:</label>
      <select
        value={service}
        onChange={handleServiceChange}
        className="border rounded p-2 text-black bg-white"
      >
        <option value="">-- Choose a service --</option>
        <option value="Haircut">Haircut ($18.50)</option>
        <option value="Beard">Beard ($10)</option>
        <option value="Both">Haircut + Beard ($23)</option>
      </select>

      {/* Name Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border rounded p-2 w-80"
        required
      />

      {/* Price and Next Button */}
      {service && (
        <>
          <p className="mt-2">Total Price: ${price}</p>
          <button
            onClick={handleNext}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Next
          </button>
        </>
      )}

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="px-3 py-1 bg-gray-500 text-white rounded"
      >
        Back
      </button>
    </div>
  );
}
