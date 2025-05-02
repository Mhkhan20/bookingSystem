"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered as:", result.user.email);
      router.push("/booking");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed. Email might already be in use.");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />

      <button onClick={handleRegister}>Register</button>

      {message && <p style={{ color: "lightgreen" }}>{message}</p>}
    </div>
  );
}
