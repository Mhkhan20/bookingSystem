"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "../../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in as:", result.user.email);
      router.push("/booking");
    } catch (error) {
      console.error("Google login error:", error);

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
    }
  };

  
  const handleResetPassword = async () => {
    try {
      if (!email) {
        alert("Please enter your email first.")
        return;
      }
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.")
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <div className="container">
       <img
        onClick={() => router.push('/entry')}
        src='/backArr.png'
        className='backArrowBtn'
    ></img>

      <div className="loginCard">
        
          <h1>Sign in</h1>
          
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />

        <p onClick={handleResetPassword} style={{ color: "black", cursor: "pointer", textDecoration:'underline' }}>
             Forgot password?
        </p>


        <button 
        className="emailLogin" 
        onClick={handleEmailLogin}
        disabled = {!email || !password}
        style={{backgroundColor:
          email && password ? "#000" : "#aaa",
          transition:' background-color 0.3s ease, transform 0.2s ease'}}
        >Login
        </button>

        <div className="divider">
            <span>or</span>
        </div>

        <button onClick={handleGoogleLogin} className="emailLogin" style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: 'center' }}>
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="Google" width="20" height="20" />
            Continue with Google
          </button>
      </div>

      <div style={{display:"flex", flexDirection:'row', gap:".25rem"}}> 
          <p>New user? </p> 
          <p style={{textDecoration:'underline', cursor:'pointer'}}
          onClick={() => router.push('./register')}
          >  Join Now</p>
      </div>
       
    </div>
  );
}
