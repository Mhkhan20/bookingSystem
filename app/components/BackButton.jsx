"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <img
      onClick={() => router.back()}
      src='/backArr.png'
      className='backArrowBtn'
    >
      
    </img>
  );
}