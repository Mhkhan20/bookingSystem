"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) { 
      alert("Please enter all credentials")
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/booking");
    } catch (error) {
      alert("Registration error:", error);
    }
  };


  const handleGoogleSignUp = async  () => { 
    try  {
      await signInWithPopup(auth, provider);
      router.push('/booking');
    } catch(error)  {
      alert("Sign up error", error);
    }
  };

  

  return (
    <div className="registerContainer">

          
      <div className="registerCard"> 
      <h1>Sign up</h1>
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

      <button className="emailLogin" onClick={handleRegister}>Sign up</button>
      
      <div style={{display:"flex", gap:".25rem"}}> 
        <p>Already have an account?</p> <p style={{textDecoration:'underline', cursor:'pointer'}} onClick={() => router.push('./login')}>Login</p>
      </div>

      <div className="divider">
            <span>or</span>
        </div>

        <button onClick={handleGoogleSignUp} className="emailLogin" style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: 'center' }}>
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="Google" width="20" height="20" />
            Sign up with Google
          </button>
      

      </div>
    </div>
  );
}
