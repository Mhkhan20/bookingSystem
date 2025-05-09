  "use client";
import Link from "next/link";

export default function Footer() {
  return (
    <div style={{
      width: "100%",
      padding: "1em 0",
      backgroundColor: "#f0ebd8", 
      color: "#000",              
      display: "flex",
      justifyContent: "center",
      gap: "1em",
      fontSize: "0.9rem",
      position: "relative",
      bottom: 0,
      textAlign: "center"
    }}>
      <Link href="/about" style={{
        textDecoration: "underline",
        color: '#000',           
        fontSize: '1.2rem',
        margin: '0'
      }}>About Us</Link>

      <p style={{ fontSize: '1.2rem', margin: '0', color: '#000' }}>|</p>

      <Link href="/help" style={{
        textDecoration: "underline",
        color: '#000',
        fontSize: '1.2rem',
        margin: '0'
      }}>Help</Link>
    </div>
  );
}
