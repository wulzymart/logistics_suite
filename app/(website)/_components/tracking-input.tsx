'use client'
import { track } from "@/app/actions/track";
import Input from "./input";
import { useState } from "react";
import Link from "next/link";
const TrackingInput = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  return <div className="flex">
    <Input placeholder="Enter order number" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
    <Link href={`/track/${trackingNumber}`}><button className="bg-black text-white px-5 py-2 rounded-md">Track</button></Link>
  </div>
};

export default TrackingInput;
