"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function WelcomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    router.push("/entry");
  };

  return (
    <div className="container" style={{ position: "relative" }}>
      <h1 className="typing-text">Welcome.</h1>

      {!loading ? (
        <button onClick={handleStart}>Get Started</button>
      ) : (
        <CircularProgress style={{ color: "#f0ebd8" }} />  // matches your color theme
      )}
    </div>
  );
}
