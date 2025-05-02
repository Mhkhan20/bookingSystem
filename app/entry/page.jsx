"use client";

import { useRouter } from "next/navigation";

export default function entry() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>Ready to Continue?</h1>

      <div style={{display:'flex', flexDirection:'row', gap:'1em'}}>
        <button onClick={() => router.push("/login")}>
          Book a Haircut
        </button>

        <button onClick={() => router.push("/cancel")}>
          Cancel a Booking
        </button>
      </div>
    </div>
  );
}
