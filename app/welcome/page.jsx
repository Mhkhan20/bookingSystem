"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

export default function WelcomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null); 
  const [navigating, setNavigating] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    
    return () => unsubscribe();
  }, []);


  const handleBookNow = () => {
    setNavigating(true); 
    if (user) {
      // User is logged in
      router.push("/booking");
    } else {
      // User is not logged in
      router.push("/login");
    }
     
  };

  return (
    <div className="container" style={{ position: "relative", gap: "1.5rem" }}>
      <h1 className="typing-text">Trimly.</h1>
       
        <button onClick={handleBookNow}>
           Book Now 
        </button>

        

    </div>
  );
}