"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { auth } from "../../lib/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

export default function WelcomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null); 
  const [loadingAuth, setLoadingAuth] = useState(true); 
  const [navigating, setNavigating] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      setLoadingAuth(false); 
    });
    
    return () => unsubscribe();
  }, []);


  const handleProceed = () => {
    setNavigating(true); // Show loading spinner
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

     
      {loadingAuth || navigating ? (
        <CircularProgress style={{ color: "#f0ebd8" }} />
      ) : (
       
        <button onClick={handleProceed} disabled={navigating}>
           Book Now 
        </button>
      )}
    </div>
  );
}