"use client";
import Image from "next/image";
import Header from "@/components/header";
import React, { useEffect, useState, useRef } from "react";

export default function Home() {
  const [openSideMenu, setOpenSideMenu] = useState("false");

  return (
    <div>
      <Header openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
      <h1 className="h-[70vh]">news</h1>
      <h1 className="h-[70vh]">act</h1>
      <h1 className="h-[70vh]">join</h1>
    </div>
  );
}
