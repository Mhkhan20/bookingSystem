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
        console.log("Please enter your email first.");
        return;
      }
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <div className="container">

      <div className="loginCard">
        
          <h1>Sign in</h1>
          
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

        <p onClick={handleResetPassword} style={{ color: "black", cursor: "pointer" }}>
             Forgot password?
        </p>


        <button className="emailLogin" onClick={handleEmailLogin}>Login</button>
        <div className="divider">
            <span>or</span>
        </div>

        <button onClick={handleGoogleLogin} className="emailLogin" style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: 'center' }}>
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="Google" width="20" height="20" />
            Sign in with Google
          </button>
      </div>

      <div style={{display:"flex", flexDirection:'row'}}> 
          <p>New?</p> 
      </div>
       
    </div>
  );
}
