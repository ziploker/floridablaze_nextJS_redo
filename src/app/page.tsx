import "server-only";
//import Image from "next/image"
//import React, { useEffect, useState, useRef } from "react";
import HomeClientWrapper from "../components/homeClientWrapper";
import HomeHeaderWrapper from "../components/homeHeaderWrapper";
import Home from "@/components/home";
import Header from "@/components/header";
import SignUp from "../components/signUp";
//import "../css/global";
// import { getSession } from "../../lib";

// const MySession = async () => {
//   await getSession().then((data) => {
//     console.log("SLEEEEEEEEEEEPer", data);
//   });
// };

// getSession().then((data) => {
//   console.log("SLEEEEEEEEEEEP", data);
// });

//console.log("inside main page, checking session", MySession);

export default function Page() {
  //const [openSideMenu, setOpenSideMenu] = useState("false");

  return (
    <>
      <HomeHeaderWrapper>
        <Header />
      </HomeHeaderWrapper>

      <HomeClientWrapper>
        <Home data="123" />
      </HomeClientWrapper>

      <SignUp />
    </>
  );
}
