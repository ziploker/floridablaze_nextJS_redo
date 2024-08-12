import "server-only";
//import Image from "next/image"
//import React, { useEffect, useState, useRef } from "react";
import HomeClientWrapper from "../components/homeClientWrapper";
import Home from "@/components/home";
import Header from "@/components/header";
import SignUp from "../components/signUp";
//import "../css/global";

export default function Page() {
  //const [openSideMenu, setOpenSideMenu] = useState("false");

  return (
    <>
      <Header />

      <HomeClientWrapper>
        <Home data="123" />
      </HomeClientWrapper>

      {/* @ts-expect-error Server Component */}
      <SignUp />
    </>
  );
}
