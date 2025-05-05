"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="container">
      <img src='/image.png' className="logs"/> 
      <h1 className="typing-text">Welcome.</h1>
      <button onClick={() => router.push("/entry")}>Get Started</button>
    </div>
  );
}
