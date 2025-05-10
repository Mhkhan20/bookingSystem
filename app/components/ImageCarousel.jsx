"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{display:'flex', justifyContent:'center', paddingTop:'1rem'}}
    >
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        width={350}
        height={300}
        style={{ objectFit: "cover", borderRadius: "20px", padding:'0', margin:'0' }}
        priority
      />
    </div>
  );
}
