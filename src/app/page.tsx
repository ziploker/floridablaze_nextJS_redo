import "server-only";
//import Image from "next/image"
//import React, { useEffect, useState, useRef } from "react";
import HomeClientWrapper from "../components/homeClientWrapper";
import Home from "@/components/home";
import Header from "@/components/header";
//import "../css/global";

export default function Page() {
  //const [openSideMenu, setOpenSideMenu] = useState("false");

  return (
    <div>
      <Header />

      <HomeClientWrapper>
        <Home data="123" />
      </HomeClientWrapper>
      <h1 className="h-[70vh]">act</h1>
      <h1 className="h-[70vh]">join</h1>
    </div>
  );
}
