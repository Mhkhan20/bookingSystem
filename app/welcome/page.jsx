"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function WelcomePage() {
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-9xl text-zinc-100 font-serif font-bold">Trimly.</h1>
        <button className="rounded-md bg-zinc-800 text-zinc-100 px-4 py-2 hover:bg-zinc-700 transition-colors" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
}
