"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async () => {

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/booking");
    } catch (error) {
      setLoading(false);

      if (error.code === "auth/email-already-in-use") {
        setMessage("An account with this email already exists. ");
      } else if (error.code === 'auth/weak-password') { 
        setMessage("Password is weak. Please use at least 6 characters.");
      }      
      else {
        setMessage("Registration failed. Please try again.");
      }
    }

  };


  const handleGoogleSignUp = async  () => { 
    try  {
      setLoading(true);
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

      {message && ( 
        <p> {message} {message.includes("already exists") && ( 
          <span 
          style={{ textDecoration: "underline", cursor: "pointer", marginLeft: "5px", color: "#000" }} onClick={() => router.push('/login')}> 
          Log in
          </span>
        )} </p>
      )}

      {!loading ? ( 
        <> 
         <button className="emailLogin" onClick={handleRegister}
          disabled = {!email || !password}
          style={{backgroundColor:
          email && password ? "#000" : "#aaa",
          transition:' background-color 0.3s ease, transform 0.2s ease'}}
          >Sign up
          </button>
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
        </>
      ) : ( 
        <div style={{display:'flex', justifyContent:'center', gap:'1rem'}}> 
          <CircularProgress style={{color:'#000'}} />
        </div>
      )}

     
      

      </div>
    </div>
  );
}
