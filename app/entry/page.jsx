"use client";

import { useRouter } from "next/navigation";
import {useState, useEffect} from 'react';
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function entry() {
  const router = useRouter();
  const [user, setUser] = useState(null);


  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { 
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleBookNow = () => {
    if (user) {
      router.push("/booking"); 
    } else {
      router.push("/login");  
    }
  };

  return (
    <div className="container">
      <h1>Lets get started!</h1>

      <div style={{display:"flex", justifyContent:'space-between', gap: "1rem"}}>
        <button onClick={handleBookNow}>
          Book a Haircut
        </button>

        <button onClick={() => router.push("/cancel")}>
          Cancel a Booking
        </button>
      </div>
    </div>
  );
}
