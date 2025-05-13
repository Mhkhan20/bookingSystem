"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "../../lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/booking");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push("/booking");
    } catch (error) {
      console.error("Google login error:", error);
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/booking");
    } catch (error) {
      console.error("Email login error:", error);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Failed to send password reset email."); // Basic alert instead of message state
    }
  };

  if (checkingAuth) {
    return (
      <div className="container" style={{ justifyContent: "center", alignItems: "center" }}>
        <CircularProgress style={{ color: "#f0ebd8" }} />
      </div>
    );
  }

  return (
    <div className="container">
      <img
        onClick={() => router.push("/welcome")}
        src="/backArr.png"
        alt="Back"
        className="backArrowBtn"
      />

      <div className="loginCard">
        <h1>Sign in</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <p
          onClick={!loading ? handleResetPassword : undefined}
          style={{
            color: "black",
            cursor: loading ? "default" : "pointer",
            textDecoration: "underline",
            opacity: loading ? 0.6 : 1,
          }}
        >
          Forgot password?
        </p>

        {!loading ? (
          <>
            <button
              className="emailLogin"
              onClick={handleEmailLogin}
              disabled={!email || !password || loading}
              style={{
                backgroundColor: email && password ? "#000" : "#aaa",
                transition: "background-color 0.3s ease, transform 0.2s ease",
              }}
            >
              Login
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="emailLogin"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png"
                alt="Google logo"
                width="20"
                height="20"
              />
              Continue with Google
            </button>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <CircularProgress style={{ color: "#000" }} />
          </div>
        )}
      </div>

      <div className="loadingProgress" style={{ opacity: loading ? 0.6 : 1 }}>
        <p>New user?</p>
        <p
          style={{
            textDecoration: "underline",
            cursor: loading ? "default" : "pointer",
          }}
          onClick={!loading ? () => router.push("./register") : undefined}
        >
          Join Now
        </p>
      </div>
    </div>
  );
}