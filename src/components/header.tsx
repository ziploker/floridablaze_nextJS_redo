"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

import leaf from "@/images/headerLeafv2.png";
import CompanyLogo from "@/components/companyLogo";
import LongNav from "@/components/longNav";
import Hamburger from "@/components/hamburger";
import SideMenu from "../components/sidemenu";
import Login from "./login";

// interface Props {
// 	openSideMenu: string
// 	setOpenSideMenu: (word: string) => void
// }
export default function Header() {
  const [logoScrolled, setLogoScrolled] = React.useState("false");
  const [longNavScrolled, setLongNavScrolled] = React.useState("false");
  const [leafScrolledSoChangeColorDown, setLeafScrolledSoChangeColorDown] =
    React.useState("false");
  const [leafScrolledSoChangeColorUp, setLeafScrolledSoChangeColorUp] =
    React.useState("false");
  const [scrollDir, setScrollDir] = useState("scrolling down");
  const [hamburgerScrolled, setHamburgerScrolled] = useState("false");
  const [openSideMenu, setOpenSideMenu] = useState("false");
  const userState = { loggedInStatus: "NOT_LOGGED_IN" };
  const [openLoginMenu, setOpenLoginMenu] = useState(false);

  return (
    <div className="relative grid grid-cols-[minmax(180px,280px)1fr] grid-areas-[left_right] grid-rows-[69px] gap-[8px] mt-[15px] max-w-[2000px] overflow-hidden cl_bp_520:grid-rows-[80px]">
      <Login
        openLoginMenu={openLoginMenu}
        setOpenLoginMenu={setOpenLoginMenu}
      />
      <div
        className={`fixed ${
          logoScrolled === "true" ? "opacity-100" : "opacity-0"
        } top-0 z-20 w-full max-w[2000px] min-w=[269px] h-[50px] bg-[#f4f4f4]`}
      />
      <CompanyLogo
        logoScrolled={logoScrolled}
        setLogoScrolled={setLogoScrolled}
      />
      <Image
        className="hidden grid-in-[right] z-30 leaf_bp_520px:block w-full h-full max-w-[520px] min-w-[250px] justify-self-end self-center"
        src={leaf}
        alt=""
      />
      <LongNav
        longNavScrolled={longNavScrolled}
        setLongNavScrolled={setLongNavScrolled}
        userState={userState}
        leafScrolledSoChangeColorDown={leafScrolledSoChangeColorDown}
        setLeafScrolledSoChangeColorDown={setLeafScrolledSoChangeColorDown}
        leafScrolledSoChangeColorUp={leafScrolledSoChangeColorUp}
        setLeafScrolledSoChangeColorUp={setLeafScrolledSoChangeColorUp}
        scrollDir={scrollDir}
        setScrollDir={setScrollDir}
        openLoginMenu={openLoginMenu}
        setOpenLoginMenu={setOpenLoginMenu}
      />
      <Hamburger
        leafScrolledSoChangeColorDown={leafScrolledSoChangeColorDown}
        leafScrolledSoChangeColorUp={leafScrolledSoChangeColorUp}
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
        scrollDir={scrollDir}
        hamburgerScrolled={hamburgerScrolled}
        setHamburgerScrolled={setHamburgerScrolled}
      />
      <SideMenu
        userState={userState}
        hamburgerScrolled={hamburgerScrolled}
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
    </div>
  );
}
