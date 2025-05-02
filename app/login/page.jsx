"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "../../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in as:", result.user.email);
      router.push("/booking");
    } catch (error) {
      console.error("Google login error:", error);
      setMessage("Google login failed.");
    }
  };

  // Email/password login
  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", result.user.email);
      router.push("/booking");
    } catch (error) {
      console.error("Email login error:", error);
      setMessage("Email login failed. Check your credentials.");
    }
  };

  
  const handleResetPassword = async () => {
    try {
      if (!email) {
        setMessage("Please enter your email first.");
        return;
      }
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <div className="container">

    <div style={{display:"flex", flexDirection:'row', gap:'1em'}}>
        {/* Google Login */}
      <button onClick={handleGoogleLogin} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="Google" width="20" height="20" />
        Sign in with Google
      </button>

      <button onClick={() => router.push("/register")}>
        Register
      </button>

    </div>
      
      

      <p style={{fontSize:"1.5em"}}>or email</p>

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

      <div style={{display:"flex", flexDirection:'row', gap: "1.4em"}}>
        <button onClick={handleEmailLogin}>Login</button>
        <button onClick={handleResetPassword}>Forgot Password?</button>
      </div>
      

      {message && <p style={{ color: "lightgreen" }}>{message}</p>}
    </div>
  );
}
